const Required = (v, field, message = null) => {
  if (v === 0) return true;
  return !!v || (message ? message : 'error');
};
const Email = (v) => {
  if (!v) return true;
  return /^(([^<>()[\]\\.,;:!#$%^&*_'+=/?{}`~\s@"]+(\.[^<>()[\]\\.,;:!#$%^&*_'+=/?{}`~\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || i18n.t("validate.email");
};
const Password =
  v => (v && v.length >= 8) || i18n.t("validate.password");
const LoginId =
  v => (v && v.length >= 8) || i18n.t("validate.loginId");
const Numeric = v => ((v === 0) || (!!v && !isNaN(v))) || i18n.t("validate.numeric");
const PositiveNumber = v => {
  return (!isNaN(Math.sign(v)) && Math.sign(v) === 1) || i18n.t("validate.numeric")
}
const PhoneNumber = v => {
  if (!v) {
    return true;
  }
  return ((v === 0) || (!isNaN(Math.sign(v)) && Math.sign(v) === 1)) || i18n.t("validate.numeric")
}
const ConfirmPassword = (v1, v2) => {
  if (!v1) {
    return true;
  }
  return (v1 && v2 && v1 === v2) || i18n.t("validate.confirmPassword");
};
const ValidateError = message => !message || message;

const BuildMessageError = (sourceErrors, errorInfo) => {
  if (!Array.isArray(sourceErrors)) {
    return null;
  }
  sourceErrors.forEach(error => {
    errorInfo[error['fieldName']] = error['errorCode'];
  })
};

export default {
  Required,
  Email,
  LoginId,
  Password,
  Numeric,
  PositiveNumber,
  PhoneNumber,
  ConfirmPassword,
  ValidateError,
  BuildMessageError
};
