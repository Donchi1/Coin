import React, { useEffect } from 'react'

import { Alert, Row } from 'react-bootstrap'
import * as Icons from '@material-ui/icons'
import { useFirebase } from 'react-redux-firebase'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

function Notifications() {
  const firebase = useFirebase()
  const dispatch = useDispatch()

  const notificationData = useSelector(
    (state) => state.authReducer.notification,
  )
  // useEffect(() => {
  //   firebase
  //     .firestore()
  //     .collection('notifications')
  //     .where('owner_uid', '==', user.uid)
  //     .limit(20)
  //     .orderBy({ date: 'desc' })
  //     .onSnapshot((qsnapshot) => {
  //       qsnapshot.map((each) => {
  //         return dispatch({
  //           type: 'NOTIFICATION_SUCCESS',
  //           data: each.data(),
  //         })
  //       })
  //     })
  // }, [])
  return (
    <div className="main-wrapper">
      <div className="content-body">
        <div>
          <div className="mt-4">
            <div className="widget-media dz-scroll p-3 ">
              <ul className="timeline">
                <li>
                  <div className="timeline-panel">
                    <div className="media mr-2">
                      <svg
                        width="50"
                        height="50"
                        viewBox="0 0 63 63"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="63" height="63" rx="14" fill="#71B945" />
                        <path
                          d="M40.6186 32.7207L40.6186 32.7207L40.6353 39.6289C40.6354 39.6328 40.6354 39.6363 40.6353 39.6396M40.6186 32.7207L40.1353 39.6341L40.6353 39.635C40.6353 39.6481 40.6347 39.6583 40.6345 39.6627L40.6344 39.6642C40.6346 39.6609 40.6351 39.652 40.6353 39.6407C40.6353 39.6403 40.6353 39.64 40.6353 39.6396M40.6186 32.7207C40.6167 31.9268 39.9717 31.2847 39.1777 31.2866C38.3838 31.2885 37.7417 31.9336 37.7436 32.7275L37.7436 32.7275L37.7519 36.1563M40.6186 32.7207L37.7519 36.1563M40.6353 39.6396C40.6329 40.4282 39.9931 41.0705 39.2017 41.0726C39.2 41.0726 39.1983 41.0727 39.1965 41.0727L39.1944 41.0727L39.1773 41.0726L32.2834 41.056L32.2846 40.556L32.2834 41.056C31.4897 41.054 30.8474 40.4091 30.8494 39.615C30.8513 38.8211 31.4964 38.179 32.2903 38.1809L32.2903 38.1809L35.719 38.1892L22.5364 25.0066C21.975 24.4452 21.975 23.5351 22.5364 22.9737C23.0978 22.4123 24.0079 22.4123 24.5693 22.9737L37.7519 36.1563M40.6353 39.6396C40.6353 39.6376 40.6353 39.6356 40.6353 39.6336L37.7519 36.1563M39.1964 41.0726C39.1957 41.0726 39.1951 41.0726 39.1944 41.0726L39.1964 41.0726Z"
                          fill="white"
                          stroke="white"
                        />
                      </svg>
                    </div>
                    <div className="media-body">
                      <h6 className="mb-1">I love you JJ</h6>
                      <small className="d-block">546787</small>
                    </div>
                  </div>
                </li>

                {notificationData?.length === 0 && (
                  <li>
                    <div className="timeline-panel">
                      <div className="media mr-2"></div>
                      <div className="media-body">
                        <h6 className="mb-1">No notification Yet</h6>
                      </div>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <section className="mt-5">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-9">
                  <div className="action-content res_md_mb_20">
                    <h3 className="wow">
                      Let Us Help You to Find a Solution That Meets Your Needs
                    </h3>
                    <p className="m-0 wow">
                      Contact our team for more information
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 text-lg-right">
                  <a
                    href="/contacts"
                    className="btn btn-default btn-radius wow history-info"
                  >
                    Contact Us <i className="fa fa-long-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </section>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <p className="copyright">
                  Copyright &copy; UltimateCoins {new Date().getFullYear()} All
                  Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notifications
