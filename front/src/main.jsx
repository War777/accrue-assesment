import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import LoginForm, {
    loginAction,
} from '@app/LoginForm';
import AddRoomForm, {
    deleteRoomAction,
    roomAction,
} from '@app/rooms/addRoomForm';
import Room, {
    bookRoomAction,
    roomLoader,
} from '@app/rooms/room';
import { roomsLoader } from '@app/rooms/rooms';
import ScheduleForm, {
    deleteScheduleAction,
} from '@app/schedules/scheduleForm';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";
import Rooms from './rooms/rooms';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
    action: loginAction,
  },
  {
    path: "/rooms",
    element: <Rooms />,
    loader: roomsLoader,
    errorElement: <div>Oops! There was an error.</div>,
    children: [
      {
        path: "add",
        element: <AddRoomForm />,
        action: roomAction,
      },
      {
        path: ":id",
        element: <Room />,
        loader: roomLoader,
        children: [
          {
            path: "book",
            action: bookRoomAction,
            children: [
              {
                path: "add",
                action: deleteScheduleAction,
                element: <ScheduleForm />,
                loader: roomLoader,
              },
              {
                path: ":scheduleId/delete",
                action: deleteScheduleAction,
              },
            ],
          },
          {
            path: "edit",
            action: roomAction,
            element: <AddRoomForm />,
            loader: roomLoader,
          },
          {
            path: "delete",
            action: deleteRoomAction,
          },
        ],
      },
    ],
  },  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <RouterProvider router={router} />
    </LocalizationProvider>
  </React.StrictMode>,
)
