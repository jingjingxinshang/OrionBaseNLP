import {Body, Controller, Post} from '@nestjs/common';
import {UserSemanticsDTO, ApiResponseDTO} from './app.dto';

//import axios from 'axios';

@Controller('api')
export class AppController {
    private conversationData: { [deviceid: string]: { id: string | null, timestamp: number } } = {};

    @Post()
    async processRequest(
        @Body() userSemantics: UserSemanticsDTO,
    ): Promise<ApiResponseDTO> {
        console.error(userSemantics)
//    const deviceid = userSemantics.user_semantics.device_id
//      ? userSemantics.user_semantics.device_id
//      : userSemantics.user_semantics.deviceid;
//    const api_key = 'app-608XTPZ5wz6wqrnickUjAOyK';
//    const api_url = 'http://172.16.1.240/v1';
//
//    const headers = {
//      Authorization: `Bearer ${api_key}`,
//      'Content-Type': 'application/json',
//    };
//
//    if (!this.conversationData.hasOwnProperty(deviceid)) {
//      this.conversationData[deviceid] = { id: null, timestamp: 0 };
//    }
//
//    const currentTime = Date.now();
//    if (currentTime - this.conversationData[deviceid].timestamp > 5 * 60 * 1000) {
//      this.conversationData[deviceid].id = null;
//    }
//
//    const data = {
//      inputs: {},
//      query: userSemantics.query,
//      response_mode: 'blocking',
//      conversation_id: this.conversationData[deviceid].id,
//      user: userSemantics.user_semantics.client_id,
//    };
        const res = {
            "status": 1,
            "error": "",
            "nlp": [
                {
                    "english_domain": "tell_me_why",//必须是“tell_me_why”
                    "slots": {},
                    "source": "xljy_common",//建议为您公司英文名称，防止与其他公司冲突，全局唯一
                    "intent": "xinlingjiayuan",//为当前事件的意图，自定义填写，建议为公司英文缩写+英文，防止与其他公司冲突，全局唯一例：lhxk_xxx
                    "answer": "您可以将起诉状等相关的材料按照法律程序提交至立案窗口或者立案庭"
                }
            ],
            "msg": "返回成功"
        };
        console.error(res)
        return res;
//    try {
//      const response = await axios.post(`${api_url}/chat-messages`, data, {
//        headers,
//      });
//
//      if (response.data && response.data.conversation_id) {
//        this.conversationData[deviceid].id = response.data.conversation_id;
//        this.conversationData[deviceid].timestamp = currentTime;
//      }
//
//      const answer = response.data.answer ? response.data.answer : '';
//
//      return {
//        status: 1,
//        nlp: [
//          {
//            english_domain: 'tell_me_why',
//            intent: 'xljy_common',
//            source: 'xinlingjiayuan',
//            slots: {},
//            answer: answer,
//          },
//        ],
//      };
//    } catch (error) {
//      console.error(error);
//
//      return {
//        status:1,
//        nlp:[
//          {
//            english_domain:'tell_me_why',
//            intent:'xljy_common',
//            source:'xinlingjiayuan',
//            slots:{},
//            answer:'你好，我好，大家好！',
//          },
//        ],
//      };
//    }
    }
}