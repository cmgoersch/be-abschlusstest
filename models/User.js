import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
        // Mindestens 1 Großbuchstabe, 1 Kleinbuchstabe, 1 Sonderzeichen
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{10,}$/.test(v);
      },
      message: props => 'Das Passwort muss mindestens 10 Zeichen lang sein und mindestens einen Großbuchstaben, einen Kleinbuchstaben und ein Sonderzeichen enthalten.'
    }
  },
  fullname: {
    type: String,
    required: true,
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
  })

  userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);