/*
 * @Author: hebing
 * @Interface:
 * @Description: 日历组件
 * @Date: 2022-04-10 12:13:55
 * @LastEditors: hebing
 * @LastEditTime: 2022-04-10 12:31:54
 * @FilePath: /nuclear-power/src/components/TaskCalendar/index.ts
 */
import { withInstall } from '/@/utils';
import taskCalendar from './src/TaskCalendar.vue';

export const TaskCalendar = withInstall(taskCalendar);
