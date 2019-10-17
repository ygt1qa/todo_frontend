<template>
<div>
    <!-- 検索結果が0件の場合-->
    <template v-if="lists.length === 0 && !isLoading">
        <i class="el-icon-warning">&nbsp;No tasks found.</i>
    </template>

    <template v-else>
        <el-col :span="6" v-for="(element, index) in lists" :key="index" class="col-style">
            <el-card :body-style="{ padding: '15px' }" class="box-card">
                <div slot="header">
                    <a :href="element.url" target="_blank">{{ element.Name }}</a>
                    <el-button @click="del(element.ID)" icon="el-icon-delete" circle ></el-button>
                    <el-button @click="drawer = true" icon="el-icon-edit" circle ></el-button>
                    <el-drawer
                      title="タスク編集"
                      :visible.sync="drawer"
                      size="30%">
                      <div>
                        <el-input placeholder="Please input" v-model="inputName" v-init:inputName=element.Name></el-input>
                        <el-input
                          type="textarea" 
                          placeholder="Please input" 
                          :rows="5"
                          v-model="inputDes" 
                          v-init:inputDes=element.Description>
                        </el-input>
                        <el-button @click=updateTask(element.ID)>Update</el-button>
                      </div>
                    </el-drawer>
                </div>
                <div class="bottom content-style text">
                   <div>{{ element.Description }}</div>
                </div>
            </el-card>
        </el-col>
        <div v-if="250 < scrollY" class="page-component-up">
            <transition name="fade">
                <i class="el-icon-caret-top" @click="scrollTop" />
            </transition>
        </div>
    </template>
</div>
</template>

<script lang="babel">
import {mapState} from 'vuex'
import axios from "axios"
import Vue from 'vue'

Vue.directive('init', {
  bind: function (el, binding, vnode) {
    vnode.context[binding.arg] = binding.value
  }
})

export default {
    data () {
        return {
          drawer: false,
          scrollY: 0,
          inputName: '',
          inputDes: ''
        }
    },
    mounted () {
        window.addEventListener('scroll', this.handleScroll)
    },
    // storeのstateからデータを取得
    computed: mapState(["lists", 'isLoading']),
    methods: {
        // 現在の上部からスクロール量取得
        handleScroll: function () {
            this.scrollY = window.scrollY
        },
        scrollTop: function () {
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
        },
        del: function (taskId) {
            axios.delete('http://localhost:8000/v1/tasks/' + taskId)
            .then(res => {
              if(res.data === "success"){
                this.$store.dispatch('getItems', {
                  keyword: ''
                })
              }
            })
            .catch(error => {
              console.error(error);
              commit("hideLoading");
              this.$router.push("/error");
            })
        },
        sendRequest () {
            this.$store.dispatch('getItems', {
                keyword: ''
            })
        },
        handleClose(done) {
        this.$confirm('You still have unsaved data, proceed?')
          .then(_ => {
            done();
          })
          .catch(_ => {});
        },
        updateTask: function (taskId) {
            axios.put('http://localhost:8000/v1/tasks/' + taskId, {
                Name: this.inputName,
                Description: this.inputDes  
            })
            .then(res => {
              if(res.data === "success"){
                this.drawer = false
                this.$store.dispatch('getItems', {
                  keyword: ''
                })
              }
            })
            .catch(error => {
              console.error(error);
              commit("hideLoading");
              this.$router.push("/error");
            })
        }
    }
}
</script>

<style>
.content-style {
  line-height: 30px;
  font-size: 14px;
}

.tab-style {
  margin-right: 5px;
}

.box-card {
  height: 360px;
  font-size: 15px;
}

.col-style {
  padding: 10px;
}

.page-component-up {
  background-color: #59bb0c;
  position: fixed;
  right: 80px;
  bottom: 80px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
}

.page-component-up i {
  color: #fff;
  display: block;
  line-height: 40px;
  text-align: center;
  font-size: 18px;
}

a:link,
a:visited {
  color: #59bb0c;
}

a:hover {
  color: #3b8070;
}
</style>