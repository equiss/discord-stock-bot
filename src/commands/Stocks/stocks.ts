import { Message } from 'discord.js';
import { ICommand } from '../../icommand';
import { extractFromOptions, checkTicker } from '../../common';

export const StocksCommand: ICommand = {
  name: 'Stocks',
  helpDescription: '${ticker} $aapl draw aapl chart',
  showInHelp: true,
  trigger: (msg: Message) => {
    const regex = new RegExp(/^\$[a-zA-Z]+/);
    return regex.test(msg.content);
  },
  command: async (message: Message) => {
    const ticker = message.content.toLowerCase().split(' ')[0].substring(1);
    const rawOptions = message.content.toLowerCase().split(ticker)[1].split(' ');
    const options = [];
    for (let i = 1; i < rawOptions.length; i++) options.push(rawOptions[i]);
    console.log(options);
    let timePeriod = extractFromOptions('time_period', options);
    const chartType = extractFromOptions('chart_type', options);
    const additionalIndicators = extractFromOptions('indicators', options);
    if (additionalIndicators.length != 0) timePeriod = 'd';

    console.log(
      `https://elite.finviz.com/chart.ashx?t=${
				 ticker
				 }&ty=${
				 chartType
				 }${timePeriod == 'd' ? `&ta=st_c,sch_200p${additionalIndicators}` : ''
				 }&p=${
				 timePeriod
				 }&s=l`
				+ `x=${Math.random()}.png`,
    );
    if (checkTicker(ticker)) {
      message.channel
        .send(
          {
			  files: [
              `https://elite.finviz.com/chart.ashx?t=${
							 ticker
							 }&ty=${
							 chartType
							 }${timePeriod == 'd' ? `&ta=st_c,sch_200p${additionalIndicators}` : ''
							 }&p=${
							 timePeriod
							 }&s=l`
							+ `x=${Math.random()}.png`,
            ],
          },
        );
    }
  },
};