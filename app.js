const app = Vue.createApp({
    data() {
        return {
            products: [],
            medicines: [],
            toys: [],
            formElements: ["", "", "", "", ""],
            formSeen: true,
        }
    },
    methods: {
        sendForm(){
            this.formSeen = false
        }
    },
    created() {
        let endpoint = "https://apipetshop.herokuapp.com/api/articulos"

        fetch(endpoint)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                this.products = [...data.response]
                this.medicines = [...data.response.filter(product => product.tipo === "Medicamento")]
                this.toys = [...data.response.filter(product => product.tipo === "Juguete")]
            })
    },
    computed: {
        isDisabled(){
            if(this.formElements.every(element=> element !== "")){
                return false
            } else {
                return true
            }
        }
    }
})
let asd = app.mount("#app")