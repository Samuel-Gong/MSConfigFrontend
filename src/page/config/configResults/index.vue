<template>
  <el-container>
    <el-header class="component-header">
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="8">
          <h2>Config Results</h2>
        </el-col>
        <el-col :span="8">
          <el-switch
            v-model="toGit"
            active-text="Push to Git"
            inactive-text="Download"
          >
          </el-switch>
        </el-col>
      </el-row>
      <hr/>
    </el-header>
    <el-main class="component-main">
      <el-table
        :data="servicesInfo"
      >
        <el-table-column
          label="Service Name"
          width="500">
          <template slot-scope="scope">
            <span>{{ scope.row.serviceName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Port"
          width="500">
          <template slot-scope="scope">
            <span>{{ scope.row.port }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <el-row type="flex" justify="space-between" align="middle">
        <el-form v-if="this.toGit" ref="form" :model="form" label-width="90px" style="width: 100%">
          <el-col :span="10">
            <el-form-item label="User Name">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="Password">
              <el-input v-model="form.password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-button type="primary" size="medium" @click="push" class="btn">Push</el-button>
          </el-col>
        </el-form>
        <el-col v-if="!this.toGit" :push="20">
          <el-button type="primary" size="medium" @click="download" class="btn">
            Download
          </el-button>
        </el-col>
      </el-row>
    </el-footer>

    <div class="charts">
      <div id="chart" style=" width:100%; height:550px;margin-top: 90px;"></div>
    </div>
  </el-container>
</template>

<script>

  import {mapState, mapMutations} from 'vuex'
  import echarts from 'echarts'

  export default {
    name: "DeployComponent",
    data() {
      return {
        servicesInfo: [],
        form: {
          username: "",
          password: ""
        },
      }
    },
    computed: {
      toGit: {
        get() {
          return this.$store.state.toGit
        },
        set(value) {
          this.$store.commit('switchToGit', value)
        }
      }
    },
    methods: {
      download() {
        this.$axios.get("/download")
          .then(() => {
            console.log("Download Success");
          });
      },

      push() {
        console.log(this.$qs.stringify(this.form));
        this.$axios({
          url: '/git/push',
          method: 'post',
          data: this.$qs.stringify(this.form),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(function (response) {
            console.log(response);
            alert("Push Success");
          })
          .catch(function (error) {
            console.log(error);
          })
      },

      drawGraph(id){
        this.chart=echarts.init(document.getElementById(id));
        this.chart.showLoading();
        var that=this
        this.chart.setOption({
          title: {
            text: 'Config Results Relations',
          },
          tooltip:{},
          animationDurationUpdate: 1500,
          animationEasingUpdate: 'quinticInOut',
          series : [
            {
              type: 'graph',
              layout: 'none',
              symbolSize: 50,//图形的大小（示例中的圆的大小）
              roam: true,//鼠标缩放及平移
              focusNodeAdjacency:true,//是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点
              label: {
                normal: {
                  show: true ,  //控制非高亮时节点名称是否显示
                  color: "#666",
                  position:'top',
                  fontSize:20
                }
              },

              edgeSymbol: ['circle', 'arrow'],
              edgeSymbolSize: [1, 10],    //箭头的大小
              edgeLabel: {
                normal:{
                  show:false
                },
                emphasis: {
                  textStyle: {
                    fontSize: 20  //边节点显示的字体大小
                  }
                }
              },

//节点信息

              data:
                [
                  {
                    name:'pet_service',
                    ip:'8010',
                    isnode:true,
                    x:100,
                    y:300,
                    symbol:'image://https://raw.githubusercontent.com/yaozheng1998/LearningNotes/master/PIC_NOTE/service.png?token=ASWG8wg2SgfenhLizBksxDN9KpIAW5pnks5bPEB5wA%3D%3D',
                  },
                  {
                    name:'account_service',
                    ip:'8020',
                    isnode:true,
                    x:200,
                    y:470,
                    symbol:'image://https://raw.githubusercontent.com/yaozheng1998/LearningNotes/master/PIC_NOTE/service.png?token=ASWG8wg2SgfenhLizBksxDN9KpIAW5pnks5bPEB5wA%3D%3D',
                  },
                  {
                    name:'inventory_service',
                    ip:'8030',
                    isnode:true,
                    x:400,
                    y:470,
                    symbol:'image://https://raw.githubusercontent.com/yaozheng1998/LearningNotes/master/PIC_NOTE/service.png?token=ASWG8wg2SgfenhLizBksxDN9KpIAW5pnks5bPEB5wA%3D%3D',
                  },
                  {
                    name:'category_service',
                    ip:'8050',
                    isnode:true,
                    x:500,
                    y:200,
                    symbol:'image://https://raw.githubusercontent.com/yaozheng1998/LearningNotes/master/PIC_NOTE/service.png?token=ASWG8wg2SgfenhLizBksxDN9KpIAW5pnks5bPEB5wA%3D%3D',
                  },
                  {
                    name:'order_service',
                    ip:'8060',
                    isnode:true,
                    x:400,
                    y:130,
                    symbol:'image://https://raw.githubusercontent.com/yaozheng1998/LearningNotes/master/PIC_NOTE/service.png?token=ASWG8wg2SgfenhLizBksxDN9KpIAW5pnks5bPEB5wA%3D%3D',
                  },
                  {
                    name:'PetStore Zuul',
                    ip:'8040',
                    isnode:true,
                    x:200,
                    y:130,
                    symbol:'image://https://raw.githubusercontent.com/yaozheng1998/LearningNotes/master/PIC_NOTE/gateway.png?token=ASWG821lKMQImAc5D5lDMkw7Idynzzmfks5bPEGVwA%3D%3D',
                  },
                  {
                    name:'Eureka Server',
                    ip:'8761',
                    isnode:true,
                    x:300,
                    y:300,
                    symbol:'image://https://raw.githubusercontent.com/yaozheng1998/LearningNotes/master/PIC_NOTE/server.png?token=ASWG8wcb4TQIE2oGwrOh7m2bDdQfek1cks5bPEGMwA%3D%3D',
                  },

                ],

              links:
                [
                  {
                    source:'pet_service',
                    target:'Eureka Server',
                    islink:true,
                    // isRibbon:true,
                    name:'链路1',
                  },
                  {
                    source:'account_service',
                    target:'Eureka Server',
                    islink:true,
                    name:'链路2',
                  },{
                  source:'inventory_service',
                  target:'Eureka Server',
                  islink:true,
                  name:'链路3',
                },{
                  source:'category_service',
                  target:'Eureka Server',
                  islink:true,
                  name:'链路4',
                },{
                  source:'order_service',
                  target:'Eureka Server',
                  islink:true,
                  name:'链路5',
                },{
                  source:'order_service',
                  target:'pet_service',
                  isRibbon:true,
                  name:'链路6',
                },{
                  source:'category_service',
                  target:'pet_service',
                  isRibbon: true,
                  name:'链路7',
                },{
                  source:'account_service',
                  target:'inventory_service',
                  isRibbon:true,
                  name:'链路8',
                },{
                  source:'category_service',
                  target:'inventory_service',
                  isRibbon:true,
                  name:'链路9',
                },
                ],
              lineStyle: {
                normal: {
                  show:true,
                  color:
                    {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0, color: '#2c2c2c' // 0% 处的颜色
                        }
                        ,{
                          offset: 1, color: '#8a8a8a' // 100% 处的颜色
                        }],
                      globalCoord: false // 缺省为 false
                    },

                  // curveness: 0.2

                },
                emphasis:{
                  color:'rgb(43,69,85)',
                  width:3,
                  type:'dashed',//虚线

                }
              },

              tooltip:
                {
                  position:'bottom',//悬浮时显示的位置
                  backgroundColor:'#707070',
                  textStyle:{fontSize:18,

                  },

                  formatter:function(params){//悬浮提示框显示的内容
                    if (params.data.islink) {return 'Service Registered';}
                    if (params.data.isRibbon) {return 'Service Provider';}
                    else if (params.data.isnode) {return params.data.ip;}
                  }
                },//悬浮时的提示框，不设置时是随鼠标移动

            }
          ]
        })
        this.chart.hideLoading()
      }

    },
    mounted() {
      this.$axios
        .get("/general/showAllServiceInfo")
        .then(response => {
          console.log(response);
          this.servicesInfo = response.data;
        });
      this.$nextTick(function(){
        this.drawGraph('chart')
      })
    }
  }
</script>

<style scoped>
  @import "../common.css";
</style>
