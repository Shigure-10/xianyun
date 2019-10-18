<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <div class="flights-content">
                <FlightsFilters :data="cacheFlightsData" @setDataList="setDataList"/>
                <FlightsListHead/>
                <FlightsItem 
                v-for="(item, index) in dataList"
                :key="index"
                :item="item"/>

                <el-pagination
                v-if="flightsData.flights.length"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageIndex"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
                <div v-if="flightsData.flights.length === 0 && !loading" style="padding: 50px; text-align:center">
                    该航班暂无数据
                </div>
            </div>

            <div class="aside">
                <FlightsAside/>
            </div>
        </el-row>
    </section>
</template>

<script>

import FlightsListHead from "@/components/air/flightsListHead"
import FlightsItem from "@/components/air/flightsItem"
import FlightsFilters from "@/components/air/flightsFilters"
import FlightsAside from "@/components/air/flightsAside"

export default {
    data(){
        return {
            flightsData: {
                flights: [],
                info: {},
                options: {}
            },
            cacheFlightsData: {
                flights: [],
                info: {},
                options: {}
            },
            pageIndex: 1,
            pageSize: 5,
            loading: true,
            total: 0
        }
    },

    components: {
        FlightsListHead,
        FlightsItem,
        FlightsFilters,
        FlightsAside
    },

    computed: {
        dataList(){
            const arr = this.flightsData.flights.slice(
                (this.pageIndex - 1) * this.pageSize, 
                this.pageIndex * this.pageSize
            )
            return arr;
        }
    },

    methods: {

        setDataList(arr){
            this.flightsData.flights = arr;
            this.total = arr.length;
            this.pageIndex = 1;
        },

        handleSizeChange(val){
            this.pageSize = val;
        },

        handleCurrentChange(val){
            this.pageIndex = val;
        },

        getList(){
            this.$axios({
                url: "/airs",
                params: this.$route.query
            }).then(res => {
                this.flightsData = res.data;
                this.cacheFlightsData = {...res.data};
                this.loading = false;
                this.total = this.flightsData.total;
            })
        }
    },

    watch: {
        $route(){
            this.getList()
        }
    },

    mounted(){
        this.getList()
    }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>