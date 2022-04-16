/*
 * @Author: hebing
 * @Interface:
 * @Description: 个人用户路由
 * @Date: 2022-04-02 14:13:18
 * @LastEditors: hebing
 * @LastEditTime: 2022-04-17 00:12:00
 * @FilePath: /nuclear-power/src/router/routes/modules/personalPortal.ts
 */
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT, getParentLayout } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
    path: '/portal',
    name: 'Portal',
    component: LAYOUT,
    redirect: '/portal/personalPortal/myPortal',
    meta: {
        icon: 'ri:user-2-fill',
        title: t('routes.personalPortal.personalPortal'),
    },
    children: [
        {
            path: 'personalPortal',
            name: 'PersonalPortal',
            // component: getParentLayout('PersonalPortal'),
            component: LAYOUT,
            redirect: '/portal/personalPortal/myPortal',
            meta: {
                title: t('routes.personalPortal.personalPortal'),
            },
            children: [
                {
                    path: 'myPortal',
                    name: 'MyPortal',
                    component: () =>
                        import('/@/views/personalPortal/personalPortal/myPortal/MyPortal.vue'),
                    meta: {
                        // affix: true,
                        title: t('routes.personalPortal.myPortal'),
                    },
                },
                {
                    path: 'myPortal2',
                    name: 'MyPortal2',
                    component: () =>
                        import('/@/views/personalPortal/personalPortal/myPortal/MyPortal2.vue'),
                    meta: {
                        // affix: true,
                        title: t('routes.personalPortal.myPortal'),
                    },
                },
            ],
        },
    ],
};
export default dashboard;
