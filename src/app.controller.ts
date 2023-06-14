import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { UserSemanticsDTO, ApiResponseDTO } from './app.dto';
import axios from 'axios';

@Controller('api')
export class AppController {
  private conversationIds: { [deviceid: string]: string | null } = {};

  @Post()
  async processRequest(
    @Body() userSemantics: UserSemanticsDTO,
  ): Promise<ApiResponseDTO> {
    const deviceid = userSemantics.user_semantics.device_id
      ? userSemantics.user_semantics.device_id
      : userSemantics.user_semantics.deviceid;
    const api_key = 'app-608XTPZ5wz6wqrnickUjAOyK';
    const api_url = 'http://182.92.115.56/v1';

    const headers = {
      Authorization: `Bearer ${api_key}`,
      'Content-Type': 'application/json',
    };

    if (!this.conversationIds[deviceid]) {
      this.conversationIds[deviceid] = null;
    }

    const data = {
      inputs: {},
      query: userSemantics.query,
      response_mode: 'blocking',
      conversation_id: this.conversationIds[deviceid],
      user: userSemantics.user_semantics.client_id,
    };

    try {
      const response = await axios.post(`${api_url}/chat-messages`, data, {
        headers,
      });

      // Extract and store conversation_id from response
      if (response.data && response.data.conversation_id) {
        this.conversationIds[deviceid] = response.data.conversation_id;
      }

      // Process response.data and create ApiResponseDTO
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
        status:0,
        nlp: [],
      };
    }
  }
}
