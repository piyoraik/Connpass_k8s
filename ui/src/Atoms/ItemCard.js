import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const postTodoStatusAPI = endpoint => {
  if (process.env.NODE_ENV === "production") {
    endpoint = process.env.REACT_APP_API_ENDPOINT + endpoint;
  }
  return axios.post(endpoint)
}

const deleteTodoAPI = endpoint => {
  if (process.env.NODE_ENV === "production") {
    endpoint = process.env.REACT_APP_API_ENDPOINT + endpoint;
  }
  return axios.delete(endpoint)
}

const TodoCard = props => {
  const data = props.data;
  const [itemInfo, setItemInfo] = useState();

  const postTodoStatus = () => {
    postTodoStatusAPI("/todo/" + data.id + "/done")
      .then(function () {
        window.location.reload();
      });
  }

  const deleteTodo = () => {
    deleteTodoAPI("/todo/" + data.id)
      .then(function () {
        window.location.reload();
      });
  }

  useEffect(() => {
    setItemInfo(data);
  }, [data])

  return (
    <div>
      {
        itemInfo ?
          (
            itemInfo.is_done === true ? (
              < div onClick={postTodoStatus} >
                ☑ {itemInfo.name} - <Button variant="outlined" color="secondary" onClick={deleteTodo}>削除する</Button>
              </div>
            ) : (
                < div onClick={postTodoStatus} >
                  □ {itemInfo.name} - <Button variant="outlined" color="secondary" onClick={deleteTodo}>削除する</Button>
                </div>
              )
          ) : (
            <div></div>
          )
      }
    </div >
  );
}

export default TodoCard;