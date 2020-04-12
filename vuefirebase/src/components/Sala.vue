<template lang="html">
    <div class="container">

        <div class="pantalla">
            <p class="font-weight-bold">Pantalla</p>
        </div>

        <div class="asientos">
            <div class="row">
                <div class="col asiento" 
                  v-for="asiento in asientos"
                  v-text="asiento.id"
                  v-bind:id="asiento.id"
                  v-bind:class="{
                    disponible : asiento.disponible, 
                    ocupado : !asiento.disponible,
                    pointer : asientoDisponible(asiento)
                  }"
                  @click="seleccionarAsiento"
                  v-bind:key="asiento.id">
                </div>
            </div>
        </div>
        
        <div class="botones">
            <b-button :disabled="contador == 0" variant="success" @click="guardar">Guardar</b-button>
            <b-button :disabled="contador == 0" variant="danger" @click="cancelar">Cancelar</b-button>
            <b-button @click="limpiar">Limpiar</b-button>
        </div>

        <div style="margin-top:20px">
            <strong>Asientos Seleccionados {{ contador }}</strong>
        </div>
        <div>
            <p>{{ this.author }}</p>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'Sala',
    created(){
        this.id = firebase.database().ref('/users').push().key  
        console.log(this.id, 'id user');
        firebase.database()
        .ref('salas')
        .child('1')
        .on('value', snapshot => this.cargarElementos(snapshot.val()))
    },    
    data(){
        return {
            id : '',
            contador : 0,
            asientos : [],
            author : process.env.VUE_APP_USER_CREATED
        }
    },
    methods : {
        actualizarElementos : function(){
            firebase.database()
            .ref('salas')
            .child('1')
            .set(this.asientos, error => this.validarRepuesta(error))
            .then(response => console.log(response, 'Actualizacion finalizada'))
        },
        asientoDisponible : function(asiento) {
            return !asiento.adquirido && (asiento.user_id == null || asiento.user_id == this.id)
        },
        asientosSeleccionados : function() {
            return this.asientos.filter(a =>!a.disponible && !a.adquirido)
        },
        cancelar : function(){
            this.asientosSeleccionados().forEach(function(asientos) {
                asientos.adquirido = false,
                asientos.disponible = true,
                asientos.user_id = null
            })
            this.actualizarElementos()
            this.contador = 0
        },
        cargarElementos: function(data){
            this.asientos = data
        },
        guardar: function(){
            firebase.database()
            .ref('salas')
            .child('1')
            .transaction(
                valoresBD => this.validarCompra(valoresBD),
                (error, committed, snapshot) => this.validarRepuesta(error, committed, snapshot)
            )
            //this.validarAsientos()
            //this.actualizarElementos()
            this.contador = 0
            //console.log('Transaccion Ejecutada')
        },
        limpiar : function() {
            this.asientos.forEach(function(a) {
                console.log(a.id, 'asiento');
                a.adquirido = false,
                a.disponible = true
                a.user_id = null
            })
            this.actualizarElementos()
            this.contador = 0
        },
        seleccionarAsiento :function(event){
            let asiento = this.asientos.find(a => a.id == event.target.id);
            console.log(asiento, 'asiento :')
            if (asiento.adquirido || (asiento.user_id != null && asiento.user_id != this.id) ) {
                this.mensajeNotify({text : 'no es posible seleccionar el asiento ' + asiento.id})                
                return 
            }
            asiento.disponible = !asiento.disponible
            asiento.user_id = this.id
            //this.actualizarElementos()
            this.contador = this.asientosSeleccionados().length
        },
        validarAsientos : function() {
            this.asientosSeleccionados().forEach(function(asiento){
              asiento.adquirido = true  
            })
        },
        validarCompra : function (valoresBD) {
            this.asientosSeleccionados().forEach(function (asiento) {
                if (valoresBD.find(a => a.id == asiento.id).adquirido) {
                    return
                }
                asiento.adquirido = true;
            })
            return this.asientos
        },
        validarRepuesta : function (error, committed, snapshot) {
            if (error) {
                this.mensajeNotify({text : 'Error al actualizar elementos'})
            } else {
                console.log(snapshot, 'datos de snapshot');
                if (committed) {
                    this.mensajeNotify({type : 'success', title : 'Transaccion Exitosa', text : 'Insert Ok'})
                }
            }            
        },
        mensajeNotify : function ({type = 'error', title = 'Error', text = 'Error en la operación'}) {
            this.$notify({
                group : 'foo',
                type,
                title,
                text
            })
        }
    }
}
</script>

<style lang="css" scoped>
.pantalla{
    background-color: #2b6282;
}
.pantalla p{
    color: white;
    font-size: 18px;
}
.pointer{
    cursor: pointer;
}
.asientos{
    margin-top: 2em;
   
}
.asiento{
    color: white;
    margin: 3px;
    font-weight: bold;
}
.disponible{background-color: blue;}
.ocupado{background-color: red;}
button{margin-left: 15px;}
.botones{margin-top: 60px;}
</style>
