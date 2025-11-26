/**
 * 全局路由中间件，用于判断路由的前进/后退方向，并将方向存储在目标路由的 meta 属性中。
 */
export default defineNuxtRouteMiddleware((to, from) => {
    // 计算路由深度：路径分段数（忽略空段）
    const getDepth = (path: string) => path.split('/').filter(Boolean).length;

    const toDepth = getDepth(to.path);
    const fromDepth = getDepth(from.path);

    // 前进：深度增加或同级（视为前进）
    // 后退：深度减少
    const isForward = toDepth >= fromDepth;
    // console.log(toDepth, fromDepth)

    // 类型守卫：确保 pageTransition 是对象
    let pageTransition = to.meta.pageTransition;
    if (pageTransition === true) {
        pageTransition = { name: 'page' };
    } else if (typeof pageTransition !== 'object' || !pageTransition) {
        pageTransition = { name: 'page' };
    }

    // 动态设置过渡类名
    pageTransition.name = isForward ? 'slide-right' : 'slide-left';
    to.meta.pageTransition = pageTransition;
});