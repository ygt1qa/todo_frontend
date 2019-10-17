<template>
    <el-form :inline="true" :model="searchForm" ref="searchForm" :rules="rules" @sumbit.native.prevent>
        <el-form-item prop="keyword">
            <el-input placeholder="search by keyword" prefix-icon="el-icon-search" v-model="searchForm.keyword" @keyup.enter.native="search('searchForm')"/>
        </el-form-item>
        <el-form-item>
            <el-button @click="add('searchForm')">add</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="babel">
import axios from "axios";

export default {
    data () {
        return {
            searchForm: {
                keyword: ''
            },
            // validation rules
            rules:{
                keyword: [
                    // 未入力はエラー
                    { required: true, message: 'Please input the keyword', trigger: 'blur' },
                    // 空白のみの入力はエラー
                    { whitespace: true, message: 'Please input the keyword', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        add(form){
            this.$refs[form].validate((valid) => {
                if (!valid) {
                    return false
                }
                this.addTask()
            })
        },
        addTask: function () {
            axios.post('http://localhost:8000/v1/tasks', {
                Name: this.searchForm.keyword,
                Description: ''
            })
            .then(response => {
                if(response.data === "success"){
                    this.$store.dispatch('getItems', {
                        keyword: ''
                    })
                }
            })
        }
    }
}
</script>

<style>
.el-form {
  margin-top: 1em;
  margin-left: 1em;
}
</style>