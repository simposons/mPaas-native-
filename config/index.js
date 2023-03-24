import baseApi from './baseApi.json';
import imgUrl from './imgUrl.json';

// 环境变量
let env = 'sit';
// clientEnv?: 'prod' | 'test' | 'stable' | 'pre' | 'unknown';
// 是否提示更新
const isUpdate = true;
const setEnv = (_env, _isIDE) => {
  console.log({ _env }, { _isIDE });
  env = _isIDE ? 'sit' : _env.clientEnv === 'prod' ? 'prod' : 'sit';
  console.info(
    `%c ENV  ${env} `,
    'background:#41b883 ; padding: 1px; border-radius: 3px;  color: #fff',
  );
};

const config = {
  env,
  setEnv,
  isUpdate,
  baseApi,
  imgUrl,
};
export default Object.freeze(config);
