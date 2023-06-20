import { Body, Controller, Post } from '@nestjs/common';
import { UserSemanticsDTO, ApiResponseDTO } from './app.dto';
import axios from 'axios';

@Controller('api')
export class AppController {
  private conversationData: { [deviceid: string]: { id: string | null, timestamp: number } } = {};

  @Post()
  async processRequest(
    @Body() userSemantics: UserSemanticsDTO,
  ): Promise<ApiResponseDTO> {
    const deviceid = userSemantics.user_semantics.device_id
      ? userSemantics.user_semantics.device_id
      : userSemantics.user_semantics.deviceid;
    const api_key = 'app-608XTPZ5wz6wqrnickUjAOyK';
    const api_url = 'http://172.16.1.240/v1';

    const headers = {
      Authorization: `Bearer ${api_key}`,
      'Content-Type': 'application/json',
    };

    if (!this.conversationData.hasOwnProperty(deviceid)) {
      this.conversationData[deviceid] = { id: null, timestamp: 0 };
    }

    const currentTime = Date.now();
    if (currentTime - this.conversationData[deviceid].timestamp > 5 * 60 * 1000) {
      this.conversationData[deviceid].id = null;
    }

    const data = {
      inputs: {},
      query: userSemantics.query,
      response_mode: 'blocking',
      conversation_id: this.conversationData[deviceid].id,
      user: userSemantics.user_semantics.client_id,
    };

    try {
      const response = await axios.post(`${api_url}/chat-messages`, data, {
        headers,
      });

      if (response.data && response.data.conversation_id) {
        this.conversationData[deviceid].id = response.data.conversation_id;
        this.conversationData[deviceid].timestamp = currentTime;
      }

      const answer = response.data.answer ? response.data.answer : '';

      return {
        status: 1,
        nlp: [
          {
            english_domain: 'tell_me_why',
            intent: 'xljy_common',
            source: 'xinlingjiayuan',
            slots: {},
            answer: answer,
          },
        ],
      };
    } catch (error) {
      console.error(error);

      return {
        status:1,
        nlp:[
          {
            english_domain:'tell_me_why',
            intent:'xljy_common',
            source:'xinlingjiayuan',
            slots:{},
            answer:'你好，我好，大家好！',
          },
        ],
      };
    }
  }
}