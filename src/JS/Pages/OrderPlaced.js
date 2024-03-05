/* eslint-disable class-methods-use-this */
/**
 *      OrderPlaced Class
 *      @version 0.0.1
 *      @author Marco Villegas
 *
 * */

 const axios = require('axios').default;
 const qs = require('qs');

 export default class OrderPlaced {

    constructor() {

        this.appHeaders = {
            'X-VTEX-API-AppKey': 'vtexappkey-lagobo-YBIYRD',
            'X-VTEX-API-AppToken': 'ZDUKSOKSNSVZUTTCWSOOUHBHYFOCPBLEVYNSQGYIGJVKBIBSMYEVAEVSCMLNAHDMGRDVFBLQTFHKMRGQDVQRWPERCVPDVLIZGJDKEFMLMOCVWLFLGUKERMPRNMSJLHUI'
        };

        this.init();
    }

    get OrderId() {
        const url = new URL(location.href)
        return url.searchParams.get("og");
    }

    init() {
        this.processOrderPlaced();
    }

    async processOrderPlaced() {
        const orderData = await this.getOrderData();
        if (!orderData) {
            return ;
        }
        this.dataScoringMatchUp(orderData);
    }

    async getOrderData() {
        const orderId = this.OrderId;
        if (!orderId) {
            return;
        }
        return await axios.request({
            url: `/api/oms/pvt/orders/${orderId}-01`,
            method: 'GET',
            headers: {
                'accept':'application/json',
                "content-type" : "application/json",
                ...this.appHeaders
            }
        }).then(({ data: orderData }) => {
            if (typeof orderData === "undefined") {
                console.log("Order Not Founded");
                return null;
            }
            return orderData;
        }).catch((error) => {
            console.log("error", error);
            return null;
        });
    }

    async dataScoringMatchUp(orderData) {
        const { paymentData } = orderData;
        // const isDataScoring = paymentData.transactions.find(transaction => transaction.payments.find(payment => payment.paymentSystemName.toLowerCase() === "datascoring"));
        // if (!isDataScoring) {
        //     return;
        // }
        let tokenDatascoring = "";
        try {
            const { data: { token } } = await this.getDatascoringToken();
            tokenDatascoring = token;
        } catch (error) {
            console.log('error', error)
        }

        this.sendDataToDatascoring(orderData, tokenDatascoring)
    }

    async getDatascoringToken() {
        return axios.request({
            url: `https://datascoring-lagobo.herokuapp.com/api/datascoring/token`,
            method: 'GET'
        })
    }

    async sendDataToDatascoring (orderData, token) {
        const datascoringData = this.formatDataScoringData(orderData);

        console.log(JSON.stringify(datascoringData));

        try {
            const sendToDataScoring = await this.sendToDatascoring(datascoringData, token)
            console.log({sendToDataScoring});
        } catch (error) {
            console.log({error})
        }
    }

    formatDataScoringData (orderData) {
        const { clientProfileData, items, shippingData } = orderData;

        const skusJson = items.map((item) => {
            return {
                id: item.productId,
                sku: item.id,
                valorProducto: item.sellingPrice/100
            };
        });

        return [
            {
                "Id": 'ecommerce_sku',
                "Valor": items.find(item => item.id)?.id
            },
            {
                "Id": 'ecommerce_tipoIdentificacion',
                "Valor": clientProfileData.documentType === 'cedulaCOL' ? 1 : 2
            },
            {
                "Id": 'ecommerce_numeroIdentificacion',
                "Valor": clientProfileData.document
            },
            {
                "Id": 'ecommerce_nombre',
                "Valor": clientProfileData.firstName
            },
            {
                "Id": 'ecommerce_apellido',
                "Valor": clientProfileData.lastName
            },
            {
                "Id": 'ecommerce_correoElectronico',
                "Valor": clientProfileData.email.split("-")[0]
            },
            {
                "Id": 'ecommerce_numeroCelular',
                "Valor": clientProfileData.phone
            },
            {
                "Id": 'ecommerce_ciudad',
                "Valor": shippingData.address.postalCode
            },
            {
                "Id": 'ecommerce_articulos_JSON',
                "Valor": JSON.stringify(skusJson)
            }
        ];
    }

    async sendToDatascoring(datascoringData, token) {
        return axios.request({
            url: `https://datascoring-lagobo.herokuapp.com/api/datascoring/`,
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                datascoringData,
                token
            }
        });
    }
}
