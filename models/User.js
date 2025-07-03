import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['company', 'applicant'],
    default: 'applicant',
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 10,
  validate: {
    validator: function(v) {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{10,}$/.test(v);
    },
    message: props => 'Das Passwort muss mindestens 10 Zeichen lang sein und mindestens einen Großbuchstaben, einen Kleinbuchstaben und ein Sonderzeichen enthalten.'
  }
  },
  fullname: {
    type: String,
    minlength: 3,
    maxlength: 20, 
    required: function () {
      return this.role === 'applicant';
    },
  },
  companyName: {
    type: String,
    required: function() {
      return this.role === 'company';
    },
  },
  contactPerson: {
    type: String,
    default: '',
  },
});

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};


export default mongoose.model('User', userSchema);