<template>
  <div class="task">
    <div class="header">
      <div class="today">今天</div>
      <div class="large">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 16 16"
          class="svgColor"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M8 14.001a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-1a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM5.146 8.147a.5.5 0 0 1 .708 0L7 9.294l3.146-3.147a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 0-.708Z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span>{{ caleTaskNumber }}个任务</span>
      </div>
    </div>
    <div class="content">
      <div class="taskItem" v-for="(item, index) in taskData" :key="item.id">
        <div class="selectCard" @click="changeState(item.id)">
          <span class="round"></span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="svgArrow"
            color="#999999"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16.5056 9.00958C16.2128 8.71668 15.7379 8.71668 15.445 9.00958L10.6715 13.7831L8.72649 11.8381C8.43359 11.5452 7.95872 11.5452 7.66583 11.8381C7.37294 12.1309 7.37293 12.6058 7.66583 12.8987L10.1407 15.3736C10.297 15.5299 10.5051 15.6028 10.7097 15.5923C10.8889 15.5833 11.0655 15.5104 11.2023 15.3735L16.5056 10.0702C16.7985 9.77735 16.7985 9.30247 16.5056 9.00958Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <div class="taskContent">
          <div class="title">{{ item.task_name }}</div>
          <div class="mainText">
            {{ item.task_description }}
          </div>
        </div>
        <div class="delete" @click="deleteTask(item)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            color="red"
            width="20px"
            height="20px"
            aria-hidden="true"
          >
            <g fill="none" fill-rule="evenodd">
              <path d="M0 0h24v24H0z"></path>
              <rect
                width="14"
                height="1"
                x="5"
                y="6"
                fill="currentColor"
                rx="0.5"
              ></rect>
              <path
                fill="currentColor"
                d="M10 9h1v8h-1V9zm3 0h1v8h-1V9z"
              ></path>
              <path
                stroke="currentColor"
                d="M17.5 6.5h-11V18A1.5 1.5 0 0 0 8 19.5h8a1.5 1.5 0 0 0 1.5-1.5V6.5zm-9 0h7V5A1.5 1.5 0 0 0 14 3.5h-4A1.5 1.5 0 0 0 8.5 5v1.5z"
              ></path>
            </g>
          </svg>
        </div>
      </div>
      <div class="addTaskItem" v-show="!taskPanel" @click="taskPanel = true">
        添加任务
      </div>
      <div class="taskEditor" v-show="taskPanel">
        <el-input
          v-model="taskValue1"
          class="selectInput1"
          placeholder="任务名称"
        ></el-input>
        <el-input
          type="textarea"
          v-model="taskValue2"
          class="selectInput2"
          placeholder="描述"
        ></el-input>
        <div class="manage">
          <div class="cancelBtn" @click="taskPanel = false">取消</div>
          <div
            class="addTaskBtn"
            :style="[
              { cursor: taskValue1 == '' ? 'not-allowed' : 'pointer' },
              { backgroundColor: taskValue1 == '' ? '' : '#dc4c3e' },
            ]"
            @click="createTask"
          >
            添加任务
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  addTask,
  queryTask,
  changeTaskState,
  deleteTask,
} from "@/services/modules/task.js";
export default {
  name: "content",
  data() {
    return {
      taskValue1: "",
      taskValue2: "",
      taskPanel: false,
      taskData: [],
    };
  },
  created() {
    this.fecthTask();
  },
  components: {},
  computed:{
    caleTaskNumber(){
      return this.taskData.length
    }
  },
  methods: {
    async fecthTask() {
      let results = await queryTask();
      let filterResults = results.data.filter((value) => value.state == 0);
      this.taskData = filterResults
    },
    async createTask() {
      let params = {
        task_name: this.taskValue1,
        task_description: this.taskValue2,
        state: 0,
      };
      let results = await addTask(params);
      if (results) {
        this.$message({
          type: "success",
          message: "事项添加成功!",
        });
        this.fecthTask();
        this.taskValue1 = "";
        this.taskValue2 = "";
      }
    },
    async changeState(id) {
      let params = {
        id,
        state: 1,
      };
      let results = await changeTaskState(params);
      if (results) {
        this.$message({
          type: "success",
          message: "事项已完成!",
        });
        this.fecthTask();
      }
    },
    async deleteTask(item) {
      let msg = `确定删除事项 <span style="color:red;font-weight:bold">${item.task_name}</span> 吗!`;
      this.$confirm(msg, "事项删除操作", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        dangerouslyUseHTMLString: true,
      }).then(async () => {
        let params = { id : item.id };
        let results = await deleteTask(params);
        if (results) {
          this.$message({
            type: "success",
            message: "事项已删除!",
          });
          this.fecthTask();
        }
      }).catch(err =>{
        console.log(err)
      })
    },
  },
};
</script>

<style scoped lang="less">
.task {
  flex: 1;
  margin: 55px;
  .today {
    font-size: 26px;
    font-weight: bold;
  }
  .large {
    font-size: 14px;
    color: #666;
    display: flex;
    align-items: center;
    margin-top: 8px;
  }
  .content {
    width: 800px;
    margin-top: 20px;

    .taskItem {
      display: flex;
      justify-content: space-between;
      padding: 10px 0px;
      cursor: pointer;
      border-bottom: 1px solid #eeeeee;
      .selectCard {
        width: 18px;
        .svgArrow {
          position: relative;
          left: -3px;
          top: -25px;
          opacity: 0;
          transition: all 0.5s;
        }
        &:hover {
          .svgArrow {
            opacity: 1;
          }
        }
      }
    }
    .round {
      display: inline-block;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 1px solid #ccc;
    }
    .taskContent {
      flex: 1;
      margin-left: 10px;
      .title {
        font-size: 14px;
      }
      .mainText {
        font-size: 12px;
        color: #666;
        margin-top: 4px;
      }
    }
    .delete {
      display: flex;
      align-items: end;
    }
    .addTaskItem {
      padding: 10px 0px 0px 30px;
      font-size: 14px;
      color: #666;
      cursor: pointer;
      &:hover {
        color: #dc4c3e;
      }
    }
    .taskEditor {
      width: 100%;
      height: 130px;
      border: 1px solid #eee;
      border-radius: 10px;
      margin-top: 10px;
      .selectInput1 {
        margin-top: 4px;
      }
      .selectInput2 {
      }
    }
    .manage {
      display: flex;
      justify-content: end;
      border-top: 1px solid #eee;
      padding: 8px 0px;
      div {
        margin-right: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
        height: 32px;
        border-radius: 5px;
        cursor: pointer;
      }
      .cancelBtn {
        width: 68px;
        background-color: #f5f5f5;
      }
      .addTaskBtn {
        width: 78px;
        background-color: #eda59e;
        color: #fff;
      }
    }
  }
}
::v-deep .el-input__inner {
  border: none !important;
  font-weight: bold;
  height: 30px;
}

::v-deep .el-textarea__inner {
  border: none !important;
  resize: none;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  font-size: 12px;
}
</style>
@/services/modules/task
