const loanApprove = {
    path: '/loan-approve', //贷款审批
    name: 'loan-approve',
    meta: { title: '贷款审批', roles: ['approve'] },
    component: () => import('@/views/loan-approve/index'),
    children: [
        {
            path: 'start',//初审
            name: 'start',
            meta: { title: '初审' },
            component: () => import('@/views/loan-approve/start')
        },
        {
            path: 'end',//终审
            name: 'end',
            meta: { title: '终审' },
            component: () => import('@/views/loan-approve/end')
        }
    ]
}

export default loanApprove