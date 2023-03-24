Component({
  // minxin 方便复用代码
  mixins: [],
  // 组件内部数据
  data: {
    num: 100,
  },
  // 可给外部传入的属性添加默认值
  props: {
    // onChange:(data)=>{
    //   console.log(data)
    // },
    number: 0,
  },
  // 组件生命周期函数
  // 组件创建时触发
  onInit() {
    console.log('onInit');
  },
  // 组件创建时和更新前触发
  deriveDataFromProps() {
    console.log('deriveDataFromProps');
  },
  // 组件创建完毕时触发
  didMount() {
    console.log('didMount');
  },
  // 组件更新完毕时触发
  didUpdate(prevProps, prevData) {
    console.log('didUpdate', { prevProps }, { prevData });
  },
  // 组件更新完毕时触发
  didUnmount() {
    console.log('didUnmount');
  },
  methods: {},
});
