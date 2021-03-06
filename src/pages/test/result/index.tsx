import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { NavBar, Icon, Tag } from 'antd-mobile';
import styles from './index.less';
import router from 'umi/router';
import { getResultById } from './service.js'
import Image from '@/components/Image'

interface ResultProps {
  userInfo: any,
  location: any
}

interface keyValueData {
  [key: string]: any
}

const Result: React.FC<ResultProps> = (props: ResultProps) => {

  const { userInfo, location } = props

  const [resultList, setResultList] = useState([])
  const [tagList, setTagList] = useState([])
  const [isShowOther, setIsShowOther] = useState(false)

  const leftClick = () => {
    router.goBack()
  }

  useEffect(() => {
    let params = {
      testId: location.query.testId
    }
    getResultById(params).then((res: any) => {
      if (res.resultCode === 200) {
        setResultList(res.data.resultList)
        setTagList(res.data.tagList)
      }
    })
    .catch((err: any) => {
      console.log(err)
    })
  }, [])

  return (
    <div className={styles["result-content"]}>
      <NavBar
				mode="dark"
				icon={<Icon type="left" />}
				onLeftClick={leftClick}
				rightContent={[]}
			>测试结果</NavBar>
      <div className={styles["top"]}></div>
      <div className={styles["content"]}>
        <div className={styles["content-header"]}>
          <Image src={userInfo.avatar ? `/avatar/${userInfo.avatar}` : require('@/assets/images/logo.jpg')} />
          <div className={styles["content-header-right"]}>
            <div className={styles["content-header-right-top"]}>
              <div></div>
              <div>{userInfo.nickname}</div>
              <div style={{"clear": "both"}}></div>
            </div>
            <div className={styles["tag-content"]}>
              {
                tagList.map((item: any) => {
                  return (
                    <div key={item.labelId} className={styles["tag-item"]}>{item.label}</div>
                  )
                })
              }
            </div>
          </div>
        </div>
        <div className={styles["content-layout-data"]}>
          <div className={styles["content-layout-data-item"]}>
            <div className={styles["content-layout-data-item-tp"]}>外向</div>
            <div></div>
            <div className={styles["content-layout-data-item-dn"]}>内向</div>
          </div>
          <div className={styles["content-layout-empty-item"]}>
            <div className={styles["content-layout-empty-tp"]}>  </div>
            <div></div>
            <div className={styles["content-layout-empty-dn"]}>  </div>
          </div>
          <div className={styles["content-layout-data-item"]}>
            <div className={styles["content-layout-data-item-tp"]}>追求</div>
            <div></div>
            <div className={styles["content-layout-data-item-dn"]}>知足</div>
          </div>
          <div className={styles["content-layout-empty-item"]}>
            <div className={styles["content-layout-empty-tp"]}>  </div>
            <div></div>
            <div className={styles["content-layout-empty-dn"]}>  </div>
          </div>
          <div className={styles["content-layout-data-item"]}>
            <div className={styles["content-layout-data-item-tp"]}>自主</div>
            <div></div>
            <div className={styles["content-layout-data-item-dn"]}>通融</div>
          </div>
          <div className={styles["content-layout-empty-item"]}>
            <div className={styles["content-layout-empty-tp"]}>  </div>
            <div></div>
            <div className={styles["content-layout-empty-dn"]}>  </div>
          </div>
          <div className={styles["content-layout-data-item"]}>
            <div className={styles["content-layout-data-item-tp"]}>亲密</div>
            <div></div>
            <div className={styles["content-layout-data-item-dn"]}>独立</div>
          </div>
          <div className={styles["content-layout-empty-item"]}>
            <div className={styles["content-layout-empty-tp"]}>  </div>
            <div></div>
            <div className={styles["content-layout-empty-dn"]}>  </div>
          </div>
          <div className={styles["content-layout-data-item"]}>
            <div className={styles["content-layout-data-item-tp"]}>随性</div>
            <div></div>
            <div className={styles["content-layout-data-item-dn"]}>计划</div>
          </div>
          <div className={styles["content-layout-empty-item"]}>
            <div className={styles["content-layout-empty-tp"]}>  </div>
            <div></div>
            <div className={styles["content-layout-empty-dn"]}>  </div>
          </div>
          <div className={styles["content-layout-data-item"]}>
            <div className={styles["content-layout-data-item-tp"]}>融入</div>
            <div></div>
            <div className={styles["content-layout-data-item-dn"]}>独处</div>
          </div>
        </div>
        <div className={styles["content-layout-word"]}>
          {
            resultList&&resultList.length > 1 && !isShowOther ?
            <>
              <div className={styles["content-layout-word-other-item"]}>
                <div></div>
                <div><span></span>{resultList[0].content}</div>
                <div style={{"clear": "both"}}></div>
              </div>
            </>
            :
            <>
            {
              resultList.map((item: any, index: number) => {
                return (
                  <div className={styles["content-layout-word-other-item"]} key={item.introId}>
                    <div></div>
                    <div><span>{index + 1}.</span>{item.content}</div>
                    <div style={{"clear": "both"}}></div>
                  </div>
                )
              })
            }
            </>
          }
          <div className={styles["content-layout-word-more"]} onClick={() => {setIsShowOther(!isShowOther)}}>{isShowOther ? '收起' : '查看更多'}</div>
        </div>
      </div>
    </div>
  )
}

export default connect(({ loading, account }: keyValueData) => ({
  loading,
  userInfo: account.userInfo
}))(Result);