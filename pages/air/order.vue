<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <OrderForm/>

            <div class="aside">
                          
            </div>
        </el-row>
    </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm"

export default {
    components: {
        OrderForm
    }
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>