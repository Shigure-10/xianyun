import { Message } from 'element-ui';
export default (context) => {
    context.$axios.onError(res => {
        const {message, statusCode} = res.response.data;

        if(statusCode === 400){
            Message.error(message)
        }

        if(statusCode === 403){
            context.redirect("/user/login");
        }
    })
}