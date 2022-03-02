import { useEffect, useReducer } from "react";
import axios from 'axios';
import { skillReducer, initialState, actionTypes } from '../reducers/skillReducer';
import { requestStates } from '../constants';

export const Skills = () => {
  const [state, dispatch] = useReducer(skillReducer, initialState);
  
  useEffect(() => {
    // GitHubAPIを叩いて、成功時とエラー時を処理分け
    dispatch({ type: actionTypes.fetch });
    axios.get('https://api.github.com/users/USER_NAME/repos')
      .then((response) => {
        const languageList = response.data.map(res => res.language);
        const countedLanguageList = generateLanguageCountObj(languageList);
        // リクエストを成功した場合、レスポンスもステートにセット
        dispatch({ type: actionTypes.success, payload: { languageList: countedLanguageList } });
      })
      .catch(() => {
        dispatch({ type: actionTypes.error });
      });
  }, []);
  // allLanguageListからfilterを使い、null以外を抽出して配列を生成。
  const generateLanguageCountObj = (allLanguageList) => {
    const notNullLanguageList = allLanguageList.filter(language => language != null);
    // new Set()で重複値を取り除いたuniqueLanguageListという配列を生成
    const uniqueLanguageList = [...new Set(notNullLanguageList)];

    return uniqueLanguageList.map(item => {
      return {
        language: item,
        count: allLanguageList.filter(language => language === item).length
      }
    });
  };
  return (
    <div id="skills">
      <div className="container">
        <div className="heading">
          <h2>Skills</h2>
        </div>
        <div className="skills-container">
          {
            state.requestState === requestStates.locading && (
              <p className="description">取得中...</p>
            )
          }
          {
            state.requestState === requestStates.error && (
              <p className="description">エラーが発生しました</p>
            )
          }
        </div>
      </div>
    </div>
  );
};