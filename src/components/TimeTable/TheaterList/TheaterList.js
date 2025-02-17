// /* eslint-disable */
import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';

import TheaterOne from './TheaterOne';

import { ResultContext, MovieContext, AreaContext } from '../../../pages/TimeTable/TimeTable';

import { ScheduleContext } from '../../../pages/Router';

const ContainerWrapper = styled.div`
  width: 100%;
  display: table;
  border-top: 0;
  position: relative;
`;

const Container = styled.div`
  position: relative;
  margin-bottom: 30px !important;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 35px;
    width: 100%;
    height: 1px;
    background-color: #d8d9db;
  }
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    &::before {
      content: '';
      display: table;
    }
  }
  li {
    border-color: #555;
    border-left: 1px solid #d8d9db;
    position: relative;
    float: left;
    width: 137px;
    border: 1px solid #d8d9db;
    list-style-type: none;
    a {
      color: #fff;
      background-color: #555;
      display: block;
      width: 100%;
      height: 34px;
      margin: 0;
      padding: 0;
      border: 0;
      line-height: 34px;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
    }
  }
`;

const Theater = styled.div`
  position: relative;
  margin-bottom: 30px;
`;

const AreaName = styled.div`
  padding: 16px 0 15px 0;
  border-bottom: 1px solid #eaeaea;
  font-weight: 700;
  font-size: 1.2em;
  a {
    color: #666;
    text-decoration: none;
    background-color: transparent;
    font-weight: 700;
    font-size: 1.2em;
  }
`;

const Box = styled.div`
  overflow: hidden;
  width: 100%;
  position: relative;
  border-bottom: 1px solid #eaeaea;
  height: 80px;
  margin-top: 10px;
`;

const Type = styled.div`
  text-align: left;
  width: 170px;
  display: table-cell;
  vertical-align: middle;
  top: 20px;
  left: 0;
  padding: 0 !important;
  float: left;
  margin-top: 15px;
`;

const TheaterName = styled.div`
  font-size: 1.2em;
  color: #444;
  font-weight: 400;
  margin-bottom: 10px;
  line-height: 1em;
  padding: 0;
  margin-bottom: 10px;
  text-align: left;
`;

const Chair = styled.p`
  color: #666;
  margin-bottom: 10px;
  line-height: 1em;
  padding: 0;
  margin: 0;
`;

const Time = styled.p`
  width: 100%;
  margin-left: 190px;
`;

const TypeArea = styled.div`
  display: table-cell;
  vertical-align: middle;
  width: 100px;
  background-color: #f2f4f5;
  text-align: center;
  color: #444;
  font-weight: 700;
  border-bottom: 0;
  margin-right: 10px;
  height: 70px;
`;
const Timebox = styled.div`
  display: table-cell;
  width: 800px;
  table {
    border-top: 1px solid #ebebeb;
    border-left: 1px solid #ebebeb;
    margin-left: 9px;
    width: auto;
    table-layout: auto;
    margin: 0;
    border: 0;
    border-collapse: collapse;
    empty-cells: show;
    text-indent: initial;
    border-spacing: 2px;
    display: table;
    tbody {
      display: table-row-group;
      vertical-align: middle;
      border-color: inherit;
      border-collapse: collapse;
      empty-cells: show;
      tr {
        display: table-row;
        vertical-align: inherit;
        border-color: inherit;
        border-collapse: collapse;
        empty-cells: show;
      }
    }
  }
`;

const NoLocation = styled.div`
  display: block;
  padding: 100px 0 0 0;
  margin-top: 68px;
  text-align: center;
  background: url(https://img.megabox.co.kr/static/pc/images/reserve/bg-re-img-film.png) top center
    no-repeat;
`;

const NoLocationInner = styled.div`
  text-align: center;
`;

function TheaterList() {
  const [hover, setHover] = useState('');

  const { resultData, setResultData } = useContext(ResultContext);
  const { movieIdArray, setMovieIdArray } = useContext(MovieContext);
  const { areaIdArray, setAreaIdArray } = useContext(AreaContext);
  const { scheduleId, setScheduleId } = useContext(ScheduleContext);

  const [data, setData] = useState([]);
  const [timeTableData, setTimeTableData] = useState([]);
  const [theaterData, setTheaterData] = useState([]);

  const [tab, setTab] = useState('서울');

  const [screen, setScreen] = useState([]);

  useEffect(() => {
    let test = [];
    let test2 = [];
    if (resultData) {
      setData(resultData.data.areas);
      if (resultData.data.timeTables) {
        setTimeTableData(resultData.data.timeTables);

        outer: for (let i = 0; i < resultData.data.timeTables.length; i++) {
          inner: for (let j = 0; j < test2.length; j++) {
            if (
              test2[j].theater_name === resultData.data.timeTables[i].theater_name &&
              test2[j].screen_name === resultData.data.timeTables[i].screen_name
            ) {
              continue outer;
            }
          }
          let imsi = {
            id: i,
            theater_name: resultData.data.timeTables[i].theater_name,
            screen_name: resultData.data.timeTables[i].screen_name,
          };
          test2.push(imsi);
        }

        const set = new Set(test2);
        const arr = [...set];

        outer2: for (let i = 0; i < arr.length - 1; i++) {
          for (let j = i + 1; j < arr.length; j++) {
            if (arr[i].theater_name === arr[j].theater_name) {
              if (Number(arr[i].screen_name.slice(0, 1)) > Number(arr[j].screen_name.slice(0, 1))) {
                let imsi2 = arr[i];
                arr[i] = arr[j];
                arr[j] = imsi2;
              }
              continue outer2;
            }
          }
        }

        console.log(arr);
        setScreen(arr);
        for (let i = 0; i < resultData.data.theaters.length; i++) {
          for (let j = 0; j < resultData.data.timeTables.length; j++) {
            if (
              resultData.data.theaters[i].theater_name ===
              resultData.data.timeTables[j].theater_name
            ) {
              test.push(resultData.data.theaters[i]);
              break;
            }
          }
        }
      } else {
        setTimeTableData([]);
      }

      setTheaterData(test);
    }
  }, [resultData]);

  return (
    <>
      {data && (
        <ContainerWrapper>
          <Container>
            <ul>
              {data.map(el => {
                return (
                  <li key={el.id}>
                    <a
                      id={el.id}
                      onClick={() => {
                        setTab(el.area_name);
                        setAreaIdArray(el.id);
                      }}
                      style={{
                        backgroundColor: el.area_name === tab ? '#555' : 'transparent',
                        color: el.area_name === tab ? 'white' : '#666',
                      }}
                    >
                      {el.area_name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </Container>
          {timeTableData.length === 0 && (
            <NoLocation>
              <NoLocationInner />
              해당 지역에 상영 시간표가 없습니다. 다른지역을 선택해 주세요.
            </NoLocation>
          )}
          {timeTableData.length !== 0 && (
            <>
              {theaterData.map(ele => {
                return (
                  <Theater key={ele.theater_id}>
                    <AreaName>
                      <a>{ele.theater_name}</a>
                    </AreaName>
                    {screen.map(el => {
                      if (ele.theater_name === el.theater_name) {
                        return (
                          <Box key={el.id}>
                            <Type>
                              <TheaterName>{el.screen_name}</TheaterName>
                              <Chair>총 100석</Chair>
                            </Type>
                            <Time>
                              <TypeArea>2D</TypeArea>
                              <Timebox>
                                <table>
                                  <tbody>
                                    <tr style={{ display: 'flex' }}>
                                      <TheaterOne
                                        ele={ele.theater_name}
                                        timeTableData={timeTableData}
                                        screenName={el.screen_name}
                                      />
                                    </tr>
                                  </tbody>
                                </table>
                              </Timebox>
                            </Time>
                          </Box>
                        );
                      }
                    })}
                  </Theater>
                );
              })}
            </>
          )}
        </ContainerWrapper>
      )}
    </>
  );
}

export default TheaterList;
