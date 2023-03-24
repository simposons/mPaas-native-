import Store from 'herculex';
// \btodo: 契约未知 数据处理层后面再加
export 
default new Store({  
  state: {
    userInfo: {},  
  },
  plugins: [    
    'logger',  
  ],  
  actions: {
    // 请求页面数据    
    async loadPageData({ commit }) {
      return commit('loadPageDataAction', {        
        userInfo: { name: 'test' },      
      });   
    }, 
  },
});
