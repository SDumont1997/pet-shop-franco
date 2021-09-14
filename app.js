const app = Vue.createApp({
    data() {
        return {
            products: [],
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