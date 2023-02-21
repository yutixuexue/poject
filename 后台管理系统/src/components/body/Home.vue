<template>
  <Main>
    <el-row class="home" :gutter="20">
      <!-- 左侧页面 -->
      <el-col :span="8">
        <!-- 个人名片 -->
        <el-card shadow="hover">
          <div class="user">
            <img :src="userImg" class="userImg" />
            <div class="userInfo">
              <p class="name">{{ name }}</p>
              <p class="access">{{ access }}</p>
            </div>
          </div>
          <div class="loginInfo">
            <p>
              上次登录时间<span>{{ lastLoginTime }}</span>
            </p>
            <p>
              上次登录地点<span>{{ lastLoginAddress }}</span>
            </p>
          </div>
        </el-card>
        
        <el-card shadow="hover">
          <el-table :data="tableData">
            <el-table-column prop="name" label="品牌"> </el-table-column>
            <el-table-column prop="monthBuy" label="本月购买"> </el-table-column>
            <el-table-column prop="totalBuy" label="总购买"> </el-table-column>
          </el-table>

        </el-card>
      </el-col>

      <el-col :span="16">
        <el-card style="height: 280px">
          <EChart :chartData="chartData[0]" style="height: 200px"></EChart>
        </el-card>
        <div style="display: flex;">
          <el-card style="height: 260px; width: 50%;">
            <EChart :chartData="chartData[1]" style="height: 240px"></EChart>
          </el-card>
          <el-card style="height: 260px; width: 50%;">
            <EChart :isAxisChart="false" :chartData="chartData[2]" style="height: 240px"></EChart>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </Main>
</template>

<script>
import Main from "../Main";
import EChart from "../EChart";
import {getData} from "@/../api/data"

export default {
  name: "Home",
  components: {
    Main,
    EChart,
    EChart
},
  data() {
    return {
      name: "Admin",
      access: "超级管理员",
      lastLoginTime: "2022-5-25",
      lastLoginAddress: "重庆",
      userImg: require("@/../images/userImg.jpg"),
      tableData: [],
      chartData: [],
    };
  },

  mounted() {
    this.$store.commit("getToken");

    getData().then(res => {
      if (res.status >= 200 && res.status < 300)
      // 折线图
        this.tableData = res.data.tableData;
        const order = res.data.orderData;
        const keyArray = Object.keys(order.data[0]);
        const orderSeries = [];
        keyArray.forEach(key => {
          orderSeries.push({
            name: key,
            data: order.data.map(item => item[key]),
            type: 'line'
          })
        });
        this.chartData.push({
          series: orderSeries,
          xData: order.date,
        })

        //柱状图
        const user = res.data.userData;
        this.chartData.push({
          series: [{
            name: '新增用户',
            data: user.map(item => item.new),
            type: 'bar'
          },{
            name: '活跃用户',
            data: user.map(item => item.active),
            type: 'bar'
          }],
          xData: user.map(item => item.date)
        })

        //饼状图
        this.chartData.push({
          series: [{
            data: res.data.videoData,
            type: 'pie'
          }]
        })
        // console.log(res.data);
    });
  },
};
</script>

<style scoped>
.home {
  display: flex;
}

.user {
  display: flex;
  align-items: center;

  border-bottom: 1px solid #ccc;
}

.userImg {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
}

.loginInfo span {
  margin-left: 30px;
}

.el-card {
  margin-top: 20px;
  margin-left: 30px;
}

.album {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.album .el-card {
  width: 30%;
  margin: 0;
  padding: 0;
  margin-bottom: 20px;
}

.album .detail {
  font-size: 14px;
  color: #606266;
}

.album img {
  width: 60px;
  height: 60px;
  margin-right: 10px;
}
</style>