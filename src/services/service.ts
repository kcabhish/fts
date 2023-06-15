import axios from 'axios';

const BASE_URL = 'http://localhost:3001/';
// Make a request for a user with a given ID

export const isActive = async () => {
    const url = BASE_URL+'isactive';
    const response = await getMethod(url);
}

interface ITranslate {
  text: string;
  sourceCode: string;
  targetCode: string;
}
export const translate = async (body: ITranslate) => {
  const url = BASE_URL+'translate';
  const response =await postMethod(url, body);
  return response.data;
}

interface ISendMessageToOpenAi {
  message: string;
}
export const sendMessageToOpenAi = async (body: ISendMessageToOpenAi) => {
  const url = BASE_URL+'chat';
  const response =await postMethod(url, body);
  return response.data;
}

const getMethod = (url: string) => {
  axios.get(url)
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
} 

const postMethod =async (url: string, body: any) => {
  return await axios.post(url, body, {
    headers: { 
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
}
