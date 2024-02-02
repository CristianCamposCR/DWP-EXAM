<template>
  <div class="mt-5 ms-3 me-3">
    <b-breadcrumb :items="items"></b-breadcrumb>
    <b-row class="mb-3">
      <b-col cols="12" sm="6">
        <b-form>
          <b-form-group id="brand-group" label="Marca:" label-for="brand">
            <b-form-input
              id="brand"
              type="text"
              placeholder="Ingresa la marca"
              required
              v-model.trim="v$.vehicle.brand.$model"
              @blur="v$.vehicle.brand.$touch"
              :state="v$.vehicle.brand.$dirty ? !v$.vehicle.brand.$error : null"
            ></b-form-input>
            <b-form-invalid-feedback v-if="!v$.vehicle.brand.required.$response"
              >Campo obligatorio</b-form-invalid-feedback
            >
            <b-form-invalid-feedback v-if="!v$.vehicle.brand.alphaNum.$response"
              >No válido (Debe ser alfanúmerico)</b-form-invalid-feedback
            >
          </b-form-group>
        </b-form>
      </b-col>
      <b-col cols="12" sm="6">
        <b-form>
          <b-form-group id="model-group" label="Modelo:" label-for="model">
            <b-form-input
              id="model"
              type="text"
              placeholder="Ingresa el modelo"
              required
              v-model.trim="v$.vehicle.model.$model"
              @blur="v$.vehicle.model.$touch"
              :state="v$.vehicle.model.$dirty ? !v$.vehicle.model.$error : null"
            ></b-form-input>
            <b-form-invalid-feedback v-if="!v$.vehicle.model.required.$response"
              >Campo obligatorio</b-form-invalid-feedback
            >
            <b-form-invalid-feedback v-if="!v$.vehicle.model.alphaNum.$response"
              >No válido (Debe ser alfanúmerico)</b-form-invalid-feedback
            >
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" sm="6">
        <b-form>
          <b-form-group
            id="year-group"
            label="Año de fabracación:"
            label-for="serialNumber"
          >
            <b-form-input
              id="serialNumber"
              type="text"
              placeholder="Ingresa el número de serie"
              required
              v-model.trim="v$.vehicle.year.$model"
              @blur="v$.vehicle.year.$touch"
              :state="v$.vehicle.year.$dirty ? !v$.vehicle.year.$error : null"
              @keyup="signal"
            ></b-form-input>
            <b-form-invalid-feedback v-if="!v$.vehicle.year.required.$response"
              >Campo obligatorio</b-form-invalid-feedback
            >
            <b-form-invalid-feedback
              v-if="
                !v$.vehicle.year.valid.$response &&
                v$.vehicle.year.required.$response
              "
              >El año debe ser menor al actual</b-form-invalid-feedback
            >
          </b-form-group>
        </b-form>
      </b-col>
      <b-col cols="12" sm="6">
        <b-form>
          <b-form-group
            id="serialNumber-group"
            label="Número de serie:"
            label-for="year"
          >
            <b-form-input
              id="year"
              type="text"
              placeholder="Ingresa el año"
              required
              v-model.trim="v$.vehicle.serialNumber.$model"
              @blur="v$.vehicle.serialNumber.$touch"
              :state="
                v$.vehicle.serialNumber.$dirty
                  ? !v$.vehicle.serialNumber.$error
                  : null
              "
            ></b-form-input>
            <b-form-invalid-feedback
              v-if="!v$.vehicle.serialNumber.required.$response"
              >Campo obligatorio</b-form-invalid-feedback
            >
            <b-form-invalid-feedback
              v-if="
                !v$.vehicle.serialNumber.valid.$response &&
                v$.vehicle.serialNumber.required.$response
              "
              >Formato incorecto (Debe cumplir con el siguiente formato:
              XXXX000-00XX )</b-form-invalid-feedback
            >
          </b-form-group>
        </b-form>
      </b-col>
      <b-col class="text-end mt-3" sm="12">
        <b-button
          @click="save"
          variant="success"
          :disabled="
            v$.vehicle.brand.$invalid ||
            v$.vehicle.model.$invalid ||
            v$.vehicle.serialNumber.$invalid ||
            v$.vehicle.year.$invalid
          "
          >Registrar</b-button
        >
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { useVuelidate } from "@vuelidate/core";
import { required, alphaNum } from "@vuelidate/validators";
import vehicle from "../../services/vehicle";
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      items: [
        {
          text: "Inicio",
          to: { name: "landpage" },
        },
        {
          text: "Formulario",
          to: { name: "form" },
          active: true,
        },
      ],
      vehicle: {
        brand: "",
        model: "",
        year: "",
        serialNumber: 0,
      },
    };
  },
  methods: {
    signal(event) {
      // Verifica si el evento contiene un dígito del 0 al 9
      if (event.keyCode >= 48 && event.keyCode <= 57) {
        return true; // Permitir dígitos del 0 al 9
      } else {
        event.preventDefault(); // Previene la acción predeterminada del evento
        return false; // Rechazar cualquier otro carácter
      }
    },
    async save() {
      try {
        const data = await vehicle.save(this.vehicle);
        console.log(data);
        if (data) {
          window.alert("Registro exitoso");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  validations: {
    vehicle: {
      brand: {
        required,
        alphaNum,
      },
      model: {
        required,
        alphaNum,
      },
      year: {
        required,
        valid: function (value) {
          return parseInt(value) <= 2023;
        },
      },
      serialNumber: {
        required,
        valid: function (value) {
          const isValid = /^[A-Z]{4}\d{3}-\d{2}[A-Z]{2}$/.test(value);
          return isValid;
        },
      },
    },
  },
};
</script>
