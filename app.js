const app = Vue.createApp({
    data() {
        return {
            products: [],
            medicines: [],
            toys: [],
            formElements: ["", "", "", "", ""],
            formSeen: true,
            productAmount: 0,
        }
    },
    methods: {
        sendForm(){
            this.formSeen = false
        },
        getFormValues(submitEvent){
            this.productAmount = submitEvent.target.elements.amountAdded.value
            this.products.forEach(product => {
                if(submitEvent.target.elements.cartSubmit.id === product._id){
                    product.__v += parseInt(this.productAmount)
                    product.stock -= this.productAmount                  
                }
                
            });
            localStorage.setItem("products", JSON.stringify(this.products))
        },
        deleteOne(clickEvent){
            this.products.forEach(product => {
                if(clickEvent.target.value === product._id){
                    product.__v --
                    product.stock ++
                }
            }) 
            localStorage.setItem("products", JSON.stringify(this.products))
        },
        calculateTotal(){
            let total = 0 
            this.paintTrolley.forEach(product => {
                total += product.precio * product.__v
            })
            return total
        },
        checkout(){
            localStorage.removeItem("products")
            this.products.forEach(product => {
                product.__v = 0
            })
        }
    },
    created() {
        let endpoint = "https://apipetshop.herokuapp.com/api/articulos"

        fetch(endpoint)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                this.products = localStorage.getItem("products")? JSON.parse(localStorage.getItem("products")) : [...data.response]
                this.medicines = [...this.products.filter(product => product.tipo === "Medicamento")]
                this.toys = [...this.products.filter(product => product.tipo === "Juguete")]
            })
    },
    computed: {
        isDisabled(){
            if(this.formElements.every(element=> element !== "")){
                return false
            } else {
                return true
            }
        },
        paintTrolley(){
            let filteredProducts = this.products.filter(product => product.__v > 0)
            return filteredProducts
        }
    }
})
let asd = app.mount("#app")