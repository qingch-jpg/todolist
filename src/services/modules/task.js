import Request from "../request";

export function queryTask() {
  return Request.get({
    url: "/createTask/queryTask",
  });
}

// 添加任务
export function addTask(params) {
  return Request.post({
    url: "/createTask",
    data: params,
  });
}

// 修改任务状态
export function changeTaskState(params) {
  return Request.post({
    url: "/createTask/changeTaskState",
    data: params,
  });
}

// 删除任务
export function deleteTask(params) {
  return Request.post({
    url: "/createTask/deleteTask",
    data: params,
  });
}
