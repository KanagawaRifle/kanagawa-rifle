import * as React from "react";

import {faBox, faPenToSquare, faStamp, faYenSign, faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Image from 'next/image'

import Link from '@kanagawa-rifle/website/components/Link';
import MainBody from '@kanagawa-rifle/website/layouts/MainBody';
import Meta from '@kanagawa-rifle/website/layouts/Meta';


export default function Page() {
  return (
    <>
      <Meta title="入会案内" />

      <MainBody>
        <h2 className="text-center text-xl">入会案内</h2>

        <p>神奈川県ライフル射撃協会、または日本ライフル射撃協会へのご入会をご希望される方は下記をご参考にお申し込みください。</p>

        <Card>
          <CardHeader title={'入会のお申込'} />
          <CardContent>
            <Stack spacing={2}>
              <Box>下記の専用サイト、<Link href="https://jrsf.sportscom.jp/#/" target="_blank">日本ライフル射撃協会 ShootersHub</Link> よりお申し込みください。</Box>
              <Card>
                <CardActionArea component={Link} href="https://jrsf.sportscom.jp/#/" target="_blank">
                  <Box style={{ position: 'relative', width: '100%', height: '82px' }}>
                    <Image
                      src="https://static.kanagawa-rifle.org/website/join/shooters-hub-logo.png"
                      alt="入会申し込みサイト（ShootersHub）"
                      fill
                      style={{ objectFit: 'contain' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </Box>
                </CardActionArea>
              </Card>
              <Stepper orientation="vertical">
                <Step expanded active>
                  <StepLabel><FontAwesomeIcon className="mr-1" fixedWidth icon={faPenToSquare} />お申込み</StepLabel>
                  <StepContent className="text-sm">日本ライフル射撃協会の専用サイト、ShootersHub より必要事項をご入力の上、お申し込みください。</StepContent>
                </Step>
                <Step expanded active>
                  <StepLabel>
                    <FontAwesomeIcon className="mr-1" fixedWidth icon={faStamp} />
                    承認（神奈川県ライフル射撃協会）
                  </StepLabel>
                  <StepContent className="text-sm">神奈川県ライフル射撃協会の会員登録担当者が承認いたします。承認完了までしばらくお待ちください。</StepContent>
                </Step>
                <Step expanded active>
                  <StepLabel>
                    <FontAwesomeIcon className="mr-1" fixedWidth icon={faStamp} />
                    承認（日本ライフル射撃協会）
                  </StepLabel>
                  <StepContent className="text-sm">日本ライフル射撃協会の会員登録担当者が承認いたします。承認完了までしばらくお待ちください。</StepContent>
                </Step>
                <Step expanded active>
                  <StepLabel>
                    <FontAwesomeIcon className="mr-1" fixedWidth icon={faYenSign} />
                    ご入金
                  </StepLabel>
                  <StepContent className="text-sm">ShootersHub より、ご入会金および年会費をお支払いください。</StepContent>
                </Step>
                <Step expanded active>
                  <StepLabel>
                    <FontAwesomeIcon className="mr-1" fixedWidth icon={faCheck} />
                    手続完了
                  </StepLabel>
                  <StepContent className="text-sm">当協会の会員証ならびにご案内をお届けいたします。なお、発送までにお時間をいただく場合がございますので、あらかじめご了承ください。</StepContent>
                </Step>
              </Stepper>
              <div>
                <ul className="list-disc list-outside ml-4">
                  <li>お申込および会費等のご入金後、理事会の承認を受けて正式に入会となります。</li>
                  <li>
                    お申込みシステムをご利用できない方は
                    <Link href="/static/forms/membership.xlsx">入会申込書</Link>
                    に必要事項をご記入の上、
                    <Link href="/about">当協会事務局</Link>
                    まで封書、ファックスまたは電子メールの添付にてお送り下さい。
                  </li>
                </ul>
              </div>
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title={'一般の方'} />
          <CardContent>
              <Box className={('grid grid-cols-4 gap-0 text-center')}>
                <Box sx={{borderBottom: '1px solid #dadce0'}}></Box>
                <Box className={'p-2'} sx={{borderBottom: '1px solid #dadce0'}}>
                  <Box className={'font-bold'}>新規</Box>
                  <Box className={'text-xs mt-2'}>これから新しく入会される方。</Box>
                </Box>
                <Box className={'p-2 rounded-t-md'} sx={{backgroundColor: '#f8f9fa', borderWidth: '1px 1px  1px 1px', borderColor: '#dadce0'}}>
                  <Box className={'font-bold'}>更新</Box>
                  <Box className={'text-xs mt-2'}>神ラに既にご入会されている方。</Box>
                </Box>
                <Box className={'p-2'} sx={{borderBottom: '1px solid #dadce0'}}>
                  <Box className={'font-bold'}>移籍</Box>
                  <Box className={'text-xs mt-2'}>神ラに入会されていない方で、学連や他都道府県団体から日ラ所属団体を神ラに変更される方。</Box>
                </Box>
              </Box>
              <Box className={('grid grid-cols-4 gap-0 text-center')}>
                <Box className={'p-2 align-middle'} sx={{borderBottom: '1px solid #dadce0'}}><span className={'font-bold text-red-600'}>日ラ</span>＋<span className={'font-bold text-green-600'}>神ラ</span></Box>
                <Box className={'p-2'} sx={{borderBottom: '1px solid #dadce0'}}>27,000円</Box>
                <Box className={'p-2'} sx={{backgroundColor: '#f8f9fa', borderWidth: '0 1px  1px 1px', borderColor: '#dadce0'}}>17,000円</Box>
                <Box className={'p-2'} sx={{borderBottom: '1px solid #dadce0'}}>22,500円</Box>
              </Box>
              <Box className={('grid grid-cols-4 gap-0 text-center')}>
                <Box className={'p-2'} sx={{borderBottom: '1px solid #dadce0'}}><span className={'font-bold text-green-600'}>神ラ</span>のみ</Box>
                <Box className={'p-2'} sx={{borderBottom: '1px solid #dadce0'}}>12,000円</Box>
                <Box className={'p-2'} sx={{backgroundColor: '#f8f9fa', borderWidth: '0 1px  1px 1px', borderColor: '#dadce0'}}>7,000円</Box>
                <Box className={'p-2'} sx={{borderBottom: '1px solid #dadce0'}}>―</Box>
              </Box>
            </CardContent>
        </Card>

        <Card>
          <CardHeader title={'学生（大学・専門学校）の方'} />
          <CardContent>
              <Box className={'mb-2'}>ご入会時に学生証等所属を証明できる書類をお送りください。</Box>
              <Box className={('grid grid-cols-4 gap-0 text-center')}>
                <Box sx={{borderBottom: '1px solid #dadce0'}}></Box>
                <Box className={'p-2'} sx={{borderBottom: '1px solid #dadce0'}}>
                  <Box className={'font-bold'}>新規</Box>
                  <Box className={'text-xs mt-2'}>これから新しく入会される方。</Box>
                </Box>
                <Box className={'p-2 rounded-t-md'} sx={{backgroundColor: '#f8f9fa', borderWidth: '1px 1px  1px 1px', borderColor: '#dadce0'}}>
                  <Box className={'font-bold'}>更新</Box>
                  <Box className={'text-xs mt-2'}>神ラに既にご入会されている方。</Box>
                </Box>
                <Box className={'p-2'} sx={{borderBottom: '1px solid #dadce0'}}>
                  <Box className={'font-bold'}>移籍</Box>
                  <Box className={'text-xs mt-2'}>神ラに入会されていない方で、学連や他都道府県団体から日ラ所属団体を神ラに変更される方。</Box>
                </Box>
              </Box>
              <Box className={('grid grid-cols-4 gap-0 text-center')}>
                <Box className={'p-2 align-middle'} sx={{borderBottom: '1px solid #dadce0'}}><span className={'font-bold text-red-600'}>日ラ</span>＋<span className={'font-bold text-green-600'}>神ラ</span></Box>
                <Box className={'p-2'} sx={{borderBottom: '1px solid #dadce0'}}>7,000円</Box>
                <Box className={'p-2'} sx={{backgroundColor: '#f8f9fa', borderWidth: '0 1px  1px 1px', borderColor: '#dadce0'}}>5,000円</Box>
                <Box className={'p-2'} sx={{borderBottom: '1px solid #dadce0'}}>6,500円</Box>
              </Box>
              <Box className={('grid grid-cols-4 gap-0 text-center')}>
                <Box className={'p-2'} sx={{borderBottom: '1px solid #dadce0'}}><span className={'font-bold text-green-600'}>神ラ</span>のみ</Box>
                <Box className={'p-2'} sx={{borderBottom: '1px solid #dadce0'}}>3,000円</Box>
                <Box className={'p-2'} sx={{backgroundColor: '#f8f9fa', borderWidth: '0 1px  1px 1px', borderColor: '#dadce0'}}>2,000円</Box>
                <Box className={'p-2'} sx={{borderBottom: '1px solid #dadce0'}}>―</Box>
              </Box>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title={'生徒（高校生以下）の方'} />
          <CardContent>
            <Box className={('grid grid-cols-4 gap-0 text-center')}>
              <Box sx={{borderBottom: '1px solid #dadce0'}}></Box>
              <Box className={'p-2'} sx={{borderBottom: '1px solid #dadce0'}}>
                <Box className={'font-bold'}>新規</Box>
                <Box className={'text-xs mt-2'}>これから新しく入会される方。</Box>
              </Box>
              <Box className={'p-2 rounded-t-md'} sx={{backgroundColor: '#f8f9fa', borderWidth: '1px 1px  1px 1px', borderColor: '#dadce0'}}>
                <Box className={'font-bold'}>更新</Box>
                <Box className={'text-xs mt-2'}>神ラに既にご入会されている方。</Box>
              </Box>
              <Box className={'p-2'} sx={{borderBottom: '1px solid #dadce0'}}>
                <Box className={'font-bold'}>移籍</Box>
                <Box className={'text-xs mt-2'}>神ラに入会されていない方で、学連や他都道府県団体から日ラ所属団体を神ラに変更される方。</Box>
              </Box>
            </Box>
            <Box className={('grid grid-cols-4 gap-0 text-center')}>
              <Box className={'p-2 align-middle'} sx={{borderBottom: '1px solid #dadce0'}}><span className={'font-bold text-red-600'}>日ラ</span>＋<span className={'font-bold text-green-600'}>神ラ</span></Box>
              <Box className={'p-2'} sx={{borderBottom: '1px solid #dadce0'}}>4,500円</Box>
              <Box className={'p-2'} sx={{backgroundColor: '#f8f9fa', borderWidth: '0 1px  1px 1px', borderColor: '#dadce0'}}>3,000円</Box>
              <Box className={'p-2'} sx={{borderBottom: '1px solid #dadce0'}}>4,500円</Box>
            </Box>
            <Box className={('grid grid-cols-4 gap-0 text-center')}>
              <Box className={'p-2'} sx={{borderBottom: '1px solid #dadce0'}}><span className={'font-bold text-green-600'}>神ラ</span>のみ</Box>
              <Box className={'p-2'} sx={{borderBottom: '1px solid #dadce0'}}>3,000円</Box>
              <Box className={'p-2'} sx={{backgroundColor: '#f8f9fa', borderWidth: '0 1px  1px 1px', borderColor: '#dadce0'}}>2,000円</Box>
              <Box className={'p-2'} sx={{borderBottom: '1px solid #dadce0'}}>―</Box>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title={'ご進学・ご就職される皆様へ'} />
          <CardContent>

            <Box className={'rounded-md text-sm font-bold p-2'} sx={{border: '1px solid #dadce0', backgroundColor: '#f8f9fa'}}>新大学生（4月1日～）</Box>
            <Box className={('grid grid-cols-2 gap-0')} sx={{borderBottom: '1px solid #dadce0'}}>
              <Box className={'p-2'}>神ラ生徒会員→学生会員<br /><span className={'font-bold text-red-600'}>日ラ</span>＋<span className={'font-bold text-green-600'}>神ラ</span>更新</Box>
              <Box className={'p-2 text-center'}>5,500円</Box>
            </Box>
            <Box className={('grid grid-cols-2 gap-0')} sx={{borderBottom: '1px solid #dadce0'}}>
              <Box className={'p-2'}>神ラ→学連へ所属移籍<br /><span className={'font-bold text-green-600'}>神ラ</span>のみ更新</Box>
              <Box className={'p-2 text-center'}>2,000円</Box>
            </Box>
            <Box className={('grid grid-cols-2 gap-0')}>
              <Box className={'p-2'}>他所属加盟団体→神ラへ新規移籍<br /><span className={'font-bold text-red-600'}>日ラ</span>更新＋<span className={'font-bold text-green-600'}>神ラ</span>新規</Box>
              <Box className={'p-2 text-center'}>6,500円</Box>
            </Box>
            <Box className={'rounded-md text-sm font-bold p-2'} sx={{border: '1px solid #dadce0', backgroundColor: '#f8f9fa'}}>新社会人（4月1日～）</Box>
            <Box className={('grid grid-cols-2 gap-0')} sx={{borderBottom: '1px solid #dadce0'}}>
              <Box className={'p-2'}>神ラ学生・生徒会員→一般会員<br /><span className={'font-bold text-red-600'}>日ラ</span>＋<span className={'font-bold text-green-600'}>神ラ</span>更新</Box>
              <Box className={'p-2 text-center'}>17,500円</Box>
            </Box>
            <Box className={('grid grid-cols-2 gap-0')} sx={{borderBottom: '1px solid #dadce0'}}>
              <Box className={'p-2'}>学連→神ラへ所属移籍<br /><span className={'font-bold text-red-600'}>日ラ</span>＋<span className={'font-bold text-green-600'}>神ラ</span>更新</Box>
              <Box className={'p-2 text-center'}>17,500円</Box>
            </Box>
            <Box className={('grid grid-cols-2 gap-0')} sx={{borderBottom: '1px solid #dadce0'}}>
              <Box className={'p-2'}>他所属加盟団体→神ラへ新規移籍<br /><span className={'font-bold text-red-600'}>日ラ</span>更新＋<span className={'font-bold text-green-600'}>神ラ</span>新規</Box>
              <Box className={'p-2 text-center'}>22,500円</Box>
            </Box>
            <Box className={('grid grid-cols-2 gap-0')}>
            </Box>
            <Box className={('grid grid-cols-2 gap-0')}>
            </Box>
            <Box className={('grid grid-cols-2 gap-0')}>
            </Box>



          </CardContent>
        </Card>

        <Card>
          <CardHeader title={'入会金・年会費一覧'} />
          <CardContent>
            <Box className={('grid grid-cols-4 gap-0 text-center')}>
              <Box sx={{borderBottom: '1px solid #dadce0'}}></Box>
              <Box className={'p-2'} sx={{borderBottom: '1px solid #dadce0'}}>
                <Box className={'font-bold'}><FontAwesomeIcon className={'mr-1 text-purple-400'} fixedWidth={true} size={'xs'} icon={faBox} />一般</Box>
                <Box className={'text-xs mt-2'}>4月1日時点で24歳以上の学生を含む。</Box>
              </Box>
              <Box className={'p-2 rounded-t-md'} sx={{backgroundColor: '#f8f9fa', borderWidth: '1px 1px  1px 1px', borderColor: '#dadce0'}}>
                <Box className={'font-bold'}><FontAwesomeIcon className={'mr-1 text-teal-400'} fixedWidth={true} size={'xs'} icon={faBox} />学生</Box>
                <Box className={'text-xs mt-2'}>大学生・専門学校生。</Box>
              </Box>
              <Box className={'p-2'} sx={{borderBottom: '1px solid #dadce0'}}>
                <Box className={'font-bold'}><FontAwesomeIcon className={'mr-1 text-rose-400'} fixedWidth={true} size={'xs'} icon={faBox} />生徒</Box>
                <Box className={'text-xs mt-2'}>高校生以下。</Box>
              </Box>
            </Box>
            <Box className={('grid grid-cols-4 gap-0 text-center')}>
              <Box className={'p-2 align-middle'} sx={{borderBottom: '1px solid #dadce0'}}><span className={'font-bold text-red-600'}>日</span>　　本<br /><span className={'font-bold text-red-600'}>ラ</span>入会金</Box>
              <Box className={'p-2'} sx={{borderBottom: '1px solid #dadce0'}}>5,000円</Box>
              <Box className={'p-2'} sx={{backgroundColor: '#f8f9fa', borderWidth: '0 1px  1px 1px', borderColor: '#dadce0'}}>1,000円</Box>
              <Box className={'p-2'} sx={{borderBottom: '1px solid #dadce0'}}>500円</Box>
            </Box>
            <Box className={('grid grid-cols-4 gap-0 text-center')}>
              <Box className={'p-2'} sx={{borderBottom: '1px solid #dadce0'}}><span className={'font-bold text-green-600'}>神</span>奈川県<br /><span className={'font-bold text-green-600'}>ラ</span>入会金</Box>
              <Box className={'p-2'} sx={{borderBottom: '1px solid #dadce0'}}>5,000円</Box>
              <Box className={'p-2'} sx={{backgroundColor: '#f8f9fa', borderWidth: '0 1px  1px 1px', borderColor: '#dadce0'}}>1,000円</Box>
              <Box className={'p-2'} sx={{borderBottom: '1px solid #dadce0'}}>1,000円</Box>
            </Box>
            <Box className={('grid grid-cols-4 gap-0 text-center')}>
              <Box className={'p-2'} sx={{borderBottom: '1px solid #dadce0'}}><span className={'font-bold text-red-600'}>日</span>　　本<br /><span className={'font-bold text-red-600'}>ラ</span>年会費</Box>
              <Box className={'p-2'} sx={{borderBottom: '1px solid #dadce0'}}>10,000円</Box>
              <Box className={'p-2'} sx={{backgroundColor: '#f8f9fa', borderWidth: '0 1px  1px 1px', borderColor: '#dadce0'}}>3,000円</Box>
              <Box className={'p-2'} sx={{borderBottom: '1px solid #dadce0'}}>1,000円</Box>
            </Box>
            <Box className={('grid grid-cols-4 gap-0 text-center')}>
              <Box className={'p-2'} sx={{borderBottom: '1px solid #dadce0'}}><span className={'font-bold text-green-600'}>神</span>奈川県<br /><span className={'font-bold text-green-600'}>ラ</span>年会費</Box>
              <Box className={'p-2'} sx={{borderBottom: '1px solid #dadce0'}}>7,000円</Box>
              <Box className={'p-2'} sx={{backgroundColor: '#f8f9fa', borderWidth: '0 1px  1px 1px', borderColor: '#dadce0'}}>2,000円</Box>
              <Box className={'p-2'} sx={{borderBottom: '1px solid #dadce0'}}>2,000円</Box>
            </Box>
            <Box className={('grid grid-cols-4 gap-0 text-center')}>
              <Box className={'p-2'} sx={{borderBottom: '1px solid #dadce0'}}>移籍料</Box>
              <Box className={'p-2'} sx={{borderBottom: '1px solid #dadce0'}}>500円</Box>
              <Box className={'p-2'} sx={{backgroundColor: '#f8f9fa', borderWidth: '0 1px  1px 1px', borderColor: '#dadce0'}}>500円</Box>
              <Box className={'p-2'} sx={{borderBottom: '1px solid #dadce0'}}>500円</Box>
            </Box>
          </CardContent>
        </Card>

      </MainBody>
    </>
  );
}
