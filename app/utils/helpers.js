/*export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}*/

export const validateEmail = (mail, fn) => {
  if (mail == "" || mail == null) {
    console.log("INFO MAIL INVALIDA")
    fn("El campo correo electrónico no puede estar vacio")
  } else {
    let regex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
    if (!regex.test(mail)) {
      console.log("Dirección de correo invalida");
      fn("El correo electrónico no puede terminar en un punto");
      return false;
    } else {
      //console.log(" - - - -Direccion de correo valida");
      validateEmailDomains(mail,fn)
    }
  }
}

const validateEmailDomains = (ValueEmail,fn) => {
  let Response = {
    Result: null,
    message: null,
    resultValidation: false,
  };
  let EmailSplit = ValueEmail.split("@");
  EmailSplit = EmailSplit[1];
  let domainsArray = [];
  if (EmailSplit.includes(".")) {
    domainsArray = EmailSplit.split(".");
  }
  const tempArrayDuplicate = [];
  for (let i = 0; i < domainsArray.length; i++) {
    if (domainsArray[i + 1] === domainsArray[i]) {
      tempArrayDuplicate.push(domainsArray[i]);
    }
  }
  if (tempArrayDuplicate.length === 0 &&domainsArray.length<=4) {
    if (ValueEmail.endsWith(".")) {
      Response.Result = false;
      Response.resultValidation = true;
      Response.message = "Correo electrónico invalido";
      fn("El correo electrónico no puede terminar en un punto");
      return Response;
    } else {

      Response.Result = true;
      Response.resultValidation = true;
      Response.message = "Email Correcto";
      fn("");
      return Response;
    }
  } else {
    Response.Result = false;
    Response.resultValidation = true;
    Response.message = "Correo electrónico invalido";
    fn("No se puede digitar más de un dominio en un correo electrónico");
    return Response;
  }
};



export const validateName = (name, fn) => {

  if (name == "" || name == null) {
    console.log("INFO name INVALIDA")
    fn("El campo nombre no puede estar vacio")

  } else {
    if (name.length < 4) {
      fn("El campo nombre no puede tener 3 o menos dígitos")
    } else {
      let regex = new RegExp(/^[A-Z]+[a-z]+$/);
      if (!regex.test(name)) {
        console.log("Nombre no valido");
        fn("El campo nombre no puede contener caracteres especiales");
        return false;
      } else {
        console.log(" - - - - Nombre valida");
        fn("");
      }
    }
  }
}

export const validateUsername = (username, fn) => {

  if (username == "" || username == null) {
    console.log("INFO name INVALIDA")
    fn("El campo nombre de usuario no puede estar vacio")

  } else {
    if (username.length < 5) {
      fn("El campo nombre de usuario no puede tener 3 o menos dígitos")
    } else {
      let regex = new RegExp(/^[A-Z]+[a-zA-Z0-9_-]{3,16}$/);
      if (!regex.test(username)) {
        console.log("Nombre de usuario no valido");
        fn("El campo nombre de usuario no puede contener caracteres especiales");
        return false;
      } else {
        console.log(" - - - - Nombre de usuario valido");
        fn("");
      }
    }
  }
}

export const validateLastname = (lastName, fn) => {
  if (lastName == "" || lastName == null) {
    console.log("INFO lastName INVALIDA")
    fn("El campo apellido no puede estar vacio")
  } else {
    if (lastName.length < 5) {
      fn("El campo apellido no puede tener 3 o menos dígitos")
    } else {
      let regex = new RegExp(/^[A-Z]+[a-z]+$/);
      if (!regex.test(lastName)) {
        console.log("Apellido no valido");
        fn("El campo apellido no puede contener caracteres especiales");
        return false;
      } else {
        console.log(" - - - - Apellido valido");
        fn("");
      }
    }
  }
}

export const validatePhone = (phone, fn) => {
  if (phone == "" || phone == null) {
    console.log("INFO phone INVALIDA")
    fn("El campo teléfono no puede estar vacio")
  } else {
    let regex = new RegExp(/^[0][9][0-9]{8}$/gmi);
    if (phone.length < 10) {
      fn("El numero de teléfono no puede tener menos 10 dígitos ")
    } else {
      if (!regex.test(phone)) {
        console.log("INFO DE TELÉFONO INVALIDA");
        fn("El campo teléfono no admite el número digitado");
        return false;
      } else {
        fn("");
      }
    }
  }
}

export const validateHomePhone = (phone, fn) => {
  if (phone == "" || phone == null) {
    console.log("INFO home-phone INVALIDA")
    fn("El campo teléfono convencional no puede estar vacio")
  } else {
    let regex = new RegExp(/^[0][2][0-9]{7}$/gmi);
    if (phone.length < 7) {
      fn("El campo teléfono convencional no puede tener menos 9 dígitos ")
    } else {
      if (!regex.test(phone)) {
        console.log("INFO TELÉFONO CONVENCIONAL INVALIDA");
        fn("El campo teléfono convencional no admite el número digitado");
        return false;
      } else {
        fn("");
      }
    }
  }
}

export const validateAddress = (address, fn) => {
  if (address == "" || address == null) {
    console.log("INFO ADDRESS INVALIDA")
    fn("El campo dirección no puede estar vacio")
  } else {
    if (address.length < 10) {
      fn("La dirección domiciliaria no puede tener menos de 10 caracteres ")
    } else {
      let regex = new RegExp(/^[A-Z a-z 1-9 -_]+$/);
      if (!regex.test(address)) {
        console.log("Dirección no valido");
        fn("El campo dirección no puede contener caracteres especiales");
        return false;
      } else {
        console.log(" - - - - Dirección valido");
        fn("");
      }
    }
  }
}

export const validatePassword = (password, fn) => {
  var myregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{8,}$/;
  if (password == "" || password == null || password == " ") {
    console.log("INFO ADDRESS INVALIDA")
    fn("El campo contraseña no puede estar vacio")
  } else {

    if (myregex.test(password)) {
      console.log("CONTRASEÑA CORRECTA")
      fn("");
    } else {
      console.log("CONTRASEÑA INCORRECTA")
      fn("La contraseña debe contener mínimo 8 caracteres con al menos una letra mayúscula, un número y un caracter especial");
    }
  }

}

export const validatePasswords = (password, password_confirmation, fn) => {
  var myregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{8,}$/;
  if (password == "" || password_confirmation == null) {
    console.log("INFO ADDRESS INVALIDA")
    fn("El campo contraseña no puede estar vacio")
  } else {
    if (password != password_confirmation) {
      fn("Las contraseñas no coinciden ")
    } else {
      fn("");

      if (myregex.test(password) && myregex.test(password_confirmation)) {
        console.log("CONTRASEÑA CORRECTA")
        fn("");
      } else {
        console.log("CONTRASEÑA INCORRECTA")
        fn("La contraseña debe contener al menos una letra mayúscula, un número y un caracter especial");
      }
    }
  }
}
