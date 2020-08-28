<template>
    <div>
        <panelProup />
        <Map />
        <Chart />
    </div>
</template>
<script> 
import panelProup from './panelProup'
import Map from './Map'
import Chart from './Chart'
export default {
    components:{
        panelProup,
        Map,
        Chart
    }
}
</script>
<style lang="scss">

</style>