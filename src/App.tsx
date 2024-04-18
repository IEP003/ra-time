import moment from 'moment';
import {Children, ReactElement, cloneElement, useState} from 'react';

interface TDate {
  date: string
}

interface VideoProps {
  url: string
  date: string
}


function DataTimePretty( {children}: {children: ReactElement | ReactElement[]}) {
  
  const thisTime = moment().format('YYYY-MM-DD hh:mm:ss');
  const converToHour = 1000*60*60
  const date1 = new Date(children.props.date)
  const date2 = new Date(thisTime)
  const differenceInHour = (date2 - date1) / converToHour

  console.log(differenceInHour >= 1 && differenceInHour <= 24)

  Children.map(
    children, (child: ReactElement) => cloneElement(child, {
      ...child.props,
      value: {
        ...child.props.date
      }
    })
  )
  
  if(differenceInHour <= 1){
    return <p className="date">{`12 минут назад`}</p>
  } else if(differenceInHour >= 1 && differenceInHour <= 24){
    return <p className="date">{`5 часов назад`}</p>
  } else if(differenceInHour > 24){
    return <p className="date">{`${Math.floor(differenceInHour/24)} дней назад`}</p>
  }

}

function DateTime(props: TDate) {
    return (
        <p className="date">{props.date}</p>
    )
}

function Video(props: VideoProps) {
    return (
        <div className="video">
            <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            <DataTimePretty>
              <DateTime date={props.date} />
            </DataTimePretty>
        </div>
    )
}

function VideoList(props: { list: VideoProps[]; }) {
    return props.list.map(item => <Video url={item.url} date={item.date} />);
}

export default function App() {
    const [list, setList] = useState([
        {
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2024-04-18 13:24:00'
        },
        {
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-03-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-02-03 23:16:00'
        },
        {
            url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-01 16:17:00'
        },
        {
            url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-12-02 05:24:00'
        },
    ]);

    return (
        <VideoList list={list} />
    );
}