import React, { useState } from 'react';
import { setupI18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { Trans, t } from '@lingui/macro';
import moment from 'moment';

import 'moment/locale/en-gb';
import 'moment/locale/zh-cn';

import msgZh from './locales/zh/messages';
import msgEn from './locales/en/messages';

const catalogsZh = { zh: msgZh };
const catalogsEn = { en: msgEn };
const i18n = setupI18n();

const utcTime = "`${moment().format('LT [UTC+8]')}`";

function Time() {
  const [lang, setLang] = useState('zh');
  const [relativeTest, setRelativeTest] = useState('');
  const changeLang = () => {
    if (lang === 'en') {
      setLang('zh');
      moment.locale('zh-cn');
    } else {
      setLang('en');
      moment.locale('en-gb');
    }
  };

  const getRelativeTime = (time, needAccurateTime = false) => {
    const now = moment();
    const parsingTime = moment(time);
    const gap = now - parsingTime;

    const [year, day, hrs, mins] = [
      parsingTime.year(),
      parsingTime.date(),
      parsingTime.hour(),
      parsingTime.minute(),
    ];

    const [currentYear, currentDay, currentHrs, currentMins] = [
      now.year(),
      now.date(),
      now.hour(),
      now.minute(),
    ];
    // future
    if (gap < 0) {
      return parsingTime.format(needAccurateTime ? 'YYYY-MM-DD LT' : 'YYYY-MM-DD');
    }
    // 一分钟以内
    else if (gap <= 1 * 60 * 1000) {
      return <Trans>刚刚</Trans>;
    }
    // 1小时以内
    else if (gap <= 1 * 60 * 60 * 1000) {
      return <Trans>{Math.floor(gap / 1000 / 60)}分钟前</Trans>;
    }
    // 24小时以内
    else if (gap <= 24 * 60 * 60 * 1000) {
      if (day === currentDay) {
        return <Trans>{Math.floor(gap / 1000 / 60 / 60)}小时前</Trans>;
      } else {
        return <Trans>昨天</Trans>;
      }
    }
    // 24-48小时
    else if (gap <= 48 * 60 * 60 * 1000) {
      if (parsingTime.add(1, 'day').date() === currentDay) {
        return <Trans>昨天</Trans>;
      } else {
        return <Trans>前天</Trans>;
      }
    }
    // 大于48小时，本自然年
    else if (gap > 48 * 60 * 60 * 1000 && year === currentYear) {
      return parsingTime.format(needAccurateTime ? 'MM-DD LT' : 'MM-DD');
    }
    // 其他年份
    else {
      return parsingTime.format(needAccurateTime ? 'YYYY-MM-DD LT' : 'YYYY-MM-DD');
    }
  };

  const getDatePeriod = (start, end, seperator = '~') =>
    `${moment(start).format('YYYY-MM-DD')} ${seperator} ${moment(end).format('YYYY-MM-DD')}`;

  const getMonthPeriod = (start, end, seperator = '~') =>
    `${moment(start).format('YYYY-MM')} ${seperator} ${moment(end).format('YYYY-MM')}`;

  return (
    <I18nProvider i18n={i18n} language={lang} catalogs={lang === 'en' ? catalogsEn : catalogsZh}>
      <button className='switch-btn' onClick={changeLang}>
        <Trans>switch.btn</Trans>
      </button>
      <h2>相对时间</h2>
      <table>
        <tbody>
          <tr>
            <th>时间</th>
            <th>展示形式</th>
            <th>代码参考</th>
            <th>显示效果</th>
          </tr>
          <tr>
            <td>一分钟以内</td>
            <td>刚刚</td>
            <td>getRelativeTime()</td>
            <td>{getRelativeTime(+new Date() - 59 * 1000)}</td>
          </tr>
          <tr>
            <td>
              <span>1 小时以内的时间</span>
            </td>
            <td>
              <span>N 分钟以前</span>
            </td>
            <td>getRelativeTime()</td>
            <td>{getRelativeTime(+new Date() - 59 * 60 * 1000)}</td>
          </tr>
          <tr>
            <td>24 小时以内的时间</td>
            <td>N 小时前或昨天</td>
            <td>getRelativeTime()</td>
            <td>{getRelativeTime(+new Date() - 10 * 60 * 60 * 1000)}</td>
          </tr>
          <tr>
            <td>24 至 48 小时以内的时间</td>
            <td>昨天或前天</td>
            <td>getRelativeTime()</td>
            <td>{getRelativeTime(+new Date() - 44 * 60 * 60 * 1000)}</td>
          </tr>
          <tr>
            <td>48 小时以外的时间</td>
            <td>用 mm-dd HH:mm 的形式表示，即「12-08 08:00」或者 mm-dd的形式表示，既「12-08」</td>
            <td>getRelativeTime()</td>
            <td>{getRelativeTime(+new Date() - 3000 * 60 * 60 * 1000, true)}</td>
          </tr>
          <tr>
            <td>超过一年的时间(跨过一个自然年)</td>
            <td>
              用 yyyy-mm-dd HH:mm 的形式表示，即「2019-12-08 08:00」或者
              yyyy-mm-dd的形式表示，既「2019-12-08」
            </td>
            <td>getRelativeTime()</td>
            <td>{getRelativeTime(moment('2015-10-12'), true)}</td>
          </tr>
        </tbody>
      </table>
      <h2></h2>
      <div>
        测试相对时间(不支持输入时间戳)：
        <input value={relativeTest} onChange={(e) => setRelativeTest(e.target.value)} />
        结果：{getRelativeTime(relativeTest)}
      </div>
      <hr />
      <h2>绝对时间</h2>
      <h3>日期格式</h3>
      <table>
        <tbody>
          <tr>
            <th>日期</th>
            <th>
              <span>如何使用及何时使用</span>
            </th>
            <th>例子</th>
            <th>代码参考</th>
            <th>显示效果</th>
          </tr>
          <tr>
            <td>年、月、日</td>
            <td>
              <p>
                <span>
                  中国：<span>yyyy-mm-dd</span>
                </span>
              </p>
              <p>
                <span>
                  海外：<span>mm-dd-yyyy</span>
                </span>
              </p>
            </td>
            <td>
              <p>2020-05-04</p>
              <p>
                <br />
              </p>
            </td>
            <td>
              <code>moment().format('L')</code>
            </td>
            <td>{moment().format('L')}</td>
          </tr>
          <tr>
            <td>
              <span>专用名词</span>
            </td>
            <td>
              <span>
                含有月日的专用名词采用阿拉伯数字表示时，应采用间隔号「&middot;」将月、日分开，并在数字前后加引号。
              </span>
            </td>
            <td>
              <span>&ldquo;5.1 劳动节&rdquo;</span>
            </td>
            <td>
              <br />
            </td>
            <td>
              <br />
            </td>
          </tr>
          <tr>
            <td>时间范围</td>
            <td>
              <span>在日期或时间范围之间显示一个波浪号 （前后需要空格）。</span>
            </td>
            <td>
              <p>
                <span>2018-12-08 ～ 2019-12-07</span>
              </p>
              <p>
                <span>2018-12 ~ 2020-12</span>
              </p>
            </td>
            <td>
              <code>
                getDatePeriod('2015-12-23', '2019-05-26')
                <br />
                getMonthPeriod('2015-12-23', '2019-05-26')
              </code>
            </td>
            <td>
              {getDatePeriod('2015-12-23', '2019-05-26')}
              <br />
              {getMonthPeriod('2015-12-23', '2019-05-26')}
            </td>
          </tr>
        </tbody>
      </table>
      <h3>时间格式</h3>
      <table>
        <tbody>
          <tr>
            <th>时间</th>
            <th>
              <span>如何使用及何时使用</span>
            </th>
            <th>例子</th>
            <th>代码参考</th>
            <th>显示效果</th>
          </tr>
          <tr>
            <td>时、分、秒</td>
            <td>HH:mm:ss(使用半角冒号)</td>
            <td>15:23:08</td>
            <td>
              <code>moment().format('LTS')</code>
            </td>
            <td>{moment().format('LTS')}</td>
          </tr>
          <tr>
            <td>时、分</td>
            <td>HH:mm(使用半角冒号)</td>
            <td>15:23</td>
            <td>
              <code>moment().format('LT')</code>
            </td>
            <td>{moment().format('LT')}</td>
          </tr>
        </tbody>
      </table>
      <h3>日历时间</h3>
      <table>
        <tbody>
          <tr>
            <th>时间</th>
            <th>如何使用</th>
            <th>例子</th>
            <th>代码参考</th>
            <th>显示效果</th>
          </tr>
          <tr>
            <td>年、月、日 &nbsp;、时、分</td>
            <td>XX月XX日 星期 HH:mm</td>
            <td>
              5月7日 &nbsp;星期四 &nbsp;13:12 。如果跨过了自然年建议书写为 &nbsp; 2018年5月7日
              &nbsp;星期四 &nbsp;13:12
            </td>
            <td>
              <code>moment().format('llll')</code>
            </td>
            <td>{moment().format('llll')}</td>
          </tr>
          <tr>
            <td>年、月、日&nbsp;</td>
            <td>XX月XX日 星期</td>
            <td>
              5月7日 &nbsp;星期四 。如果跨过了自然年建议书写为 &nbsp; 2018年5月7日 &nbsp;星期四
            </td>
            <td>
              <code>moment().format(i18n._(t`LL dddd`))</code>
            </td>
            <td>{moment().format(i18n._(t`LL dddd`))}</td>
          </tr>
        </tbody>
      </table>
      <h3>时区</h3>
      <table>
        <tbody>
          <tr>
            <th>时间</th>
            <th>例子</th>
            <th>代码参考</th>
            <th>显示效果</th>
          </tr>
          <tr>
            <td>时、分</td>
            <td>15:23 UTC+8</td>
            <td>
              <code>{utcTime}</code>
            </td>
            <td>{`${moment().format('LT [UTC+8]')}`}</td>
          </tr>
        </tbody>
      </table>
      <hr />
      <h2>缩写</h2>
      <table>
        <tbody>
          <tr>
            <th>全写</th>
            <th>简写</th>
            <th>代码参考</th>
            <th>显示效果</th>
          </tr>
          <tr>
            <td>一月</td>
            <td>January</td>
            <td>
              <code>moment('2020-01-01').format('MMMM')</code>
            </td>
            <td>{moment('2020-01-01').format('MMMM')}</td>
          </tr>
          <tr>
            <td>1月</td>
            <td>Jan</td>
            <td>
              <code>moment('2020-01-01').format('MMM')</code>
            </td>
            <td>{moment('2020-01-01').format('MMM')}</td>
          </tr>
          <tr>
            <td>星期一</td>
            <td>Monday</td>
            <td>
              <code>moment().format('dddd')</code>
            </td>
            <td>{moment().format('dddd')}</td>
          </tr>
          <tr>
            <td>星期一</td>
            <td>Mon</td>
            <td>
              <code>moment().format('ddd')</code>
            </td>
            <td>{moment().format('ddd')}</td>
          </tr>
        </tbody>
      </table>
    </I18nProvider>
  );
}

export default Time;
