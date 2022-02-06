import { useEffect, useState } from "react";
import axios from 'axios';

export const Skills = () => {
  const [languageList, setLanguageList] = useState([]);
  console.log(languageList);
  
  useEffect(() => {
    axios.get('https://api.github.com/users/USER_NAME/repos')
      .then((response) => {
        // プログラミング言語のデータを取得
        const languageList = response.data.map(res => res.language);
        // generateLanguageCountObj()は引数にallLanguageListを受け取り、それを整形して返す
        const countedLanguageList = generateLanguageCountObj(languageList);
        setLanguageList(countedLanguageList);
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
        </div>
      </div>
    </div>
  );
};