import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  private readonly logger: Logger = new Logger(MailService.name);
  constructor(private readonly mailerService: MailerService) {}
  sendMailLoginApp(code: string, email: string) {
    this.mailerService
      .sendMail({
        to: email,
        from: 'Fireal Official <no-reply@fireal.io>',
        subject: '[FIREAL.IO] Login Admin App Code.',
        text: 'Confirmation',
        html: `
          <table
              role="presentation"
              style="
                width: 100%;
                border-collapse: collapse;
                border: 0;
                border-spacing: 0;
                background: #ffffff;
              "
            >
              <tr>
                <td align="center" style="padding: 0">
                  <table
                    role="presentation"
                    style="
                      width: 375px;
                      border-collapse: collapse;
                      border: 1px solid #cccccc;
                      border-spacing: 0;
                      text-align: left;
                      margin-top: 30px;
                    "
                  >
                    <tr>
                      <td align="center" style="padding: 40px 0 30px 0">
                        <img
                          src="https://storage.googleapis.com/ftxtoken.appspot.com/image%2020.png"
                          alt=""
                        />
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 0px 12px">
                        <table
                          role="presentation"
                          style="
                            width: 100%;
                            border-collapse: collapse;
                            border: 0;
                            border-spacing: 0;
                          "
                        >
                          <tr>
                            <td style="padding: 0 0 18px 0; color: #000000">
                              <div
                                style="
                                  font-size: 16px;
                                  font-weight: 600;
                                  font-family: Arial, sans-serif;
                                "
                              >
                                【BABBU CITY】 Your Avive verification code
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <img
                                style="width: 100%"
                                src="https://storage.googleapis.com/ftxtoken.appspot.com/Frame%201171275457%20(1).png"
                                alt=""
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div
                                style="
                                  color: #101010;
                                  font-size: 24px;
                                  font-weight: 600;
                                  text-align: start;
                                  padding-top: 18px;
                                "
                              >
                                Your certification code is:
                              </div>
                              <div
                                style="
                                  color: #7e8492;
                                  font-size: 14px;
                                  font-weight: 400;
                                  text-align: start;
                                  padding-top: 8px;
                                "
                              >
                                Email verification code, validity time: 1 minutes
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <button
                                style="
                                  margin-top: 8px;
                                  background: #2e8dff;
                                  border-radius: 36px;
                                  padding: 6px 24px 6px 24px;
                                  border: none;
                                  color: #fff;
                                  width: 176px;
                                  font-size: 24px;
                                  font-weight: 600;
                                  display: flex;
                                  align-items: center;
                                  justify-content: center ; 
                                "
                              >
                                ${code}
                                <img src="https://storage.googleapis.com/ftxtoken.appspot.com/copy.png" alt="">
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div
                                style="
                                  padding-top: 24px;
                                  font-size: 14px;
                                  font-weight: 400;
                                  color: #606060;
                                "
                              >
                                Please complete the account verification process in 20
                                minutes. Beware: Do not share this code to anyone!!!
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-top: 18px">
                        <table
                          role="presentation"
                          style="
                            width: 100%;
                            border-collapse: collapse;
                            border: 0;
                            border-spacing: 0;
                            font-size: 9px;
                            font-family: Arial, sans-serif;
                          "
                        >
                          <tbody>
                            <tr>
                              <td>
                                <div
                                  style="border: 1px dashed rgb(175, 179, 187)"
                                ></div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div style="display: flex; justify-content: center">
                                  <div style="margin: 18px">
                                    <img
                                      src="https://storage.googleapis.com/ftxtoken.appspot.com/Telegram_logo%201.png"
                                      alt=""
                                    />
                                  </div>
                                  <div style="margin: 18px">
                                    <img
                                      src="https://storage.googleapis.com/ftxtoken.appspot.com/Twitter.png"
                                      alt=""
                                    />
                                  </div>
                                  <div style="margin: 18px">
                                    <img
                                      src="https://storage.googleapis.com/ftxtoken.appspot.com/Facebook.png"
                                      alt=""
                                    />
                                  </div>
                                  <div style="margin: 18px">
                                    <img
                                      src="https://storage.googleapis.com/ftxtoken.appspot.com/Facebook%20(1).png"
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div
                                  style="
                                    font-size: 12px;
                                    font-weight: 400;
                                    color: #7e8492;
                                    text-align: center;
                                  "
                                >
                                  Download BABBU City World App Now <br />
                                  Stay updated everywhere!
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div
                                  style="
                                    display: flex;
                                    justify-content: center;
                                    margin-top: 12px;
                                  "
                                >
                                  <div style="margin: 0px 10px">
                                    <img
                                      src="https://storage.googleapis.com/ftxtoken.appspot.com/Google%20Play%20Badge.png"
                                      alt=""
                                    />
                                  </div>
                                  <div style="margin: 0px 10px">
                                    <img
                                      src="https://storage.googleapis.com/ftxtoken.appspot.com/content.png"
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
        `,
      })
      .then((res) => {
        this.logger.log(res);
      })
      .catch((err) => {
        this.logger.error(err);
      });
  }
}
