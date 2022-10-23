import React, { useState, useEffect } from 'react'
import { useFirebase } from 'react-redux-firebase'

import { Link } from 'react-router-dom'
import img from '../../assets/avater.png'
import moment from 'moment'
import * as Icons from '@material-ui/icons'
import { List, ListItem, Divider, Drawer } from '@material-ui/core'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'

function AdminChat() {
  const firebase = useFirebase()
  const { messagesInDatabase, chats } = useSelector(
    (state) => state.firestore.ordered,
  )

  const [userInfo, setUserInfo] = useState({
    id: '',
    photo: '',
    email: '',
    username: '',
    isAdmin: false,
  })
  useFirestoreConnect([
    { collection: 'chats', orderBy: ['createdAt', 'desc'] },
    {
      collection: 'chats',
      doc: userInfo.id || '34416twgfghwghjgytrertqrtg',
      subcollections: [
        { collection: 'messages', orderBy: ['createdAt', 'desc'] },
      ],
      storeAs: 'messagesInDatabase',
    },
  ])

  const [messages, setMessages] = useState('')
  const [openSlider, setOpenSlider] = useState(false)

  const handleSubmit = () => {
    firebase
      .firestore()
      .collection('chats')
      .doc(userInfo.id)
      .collection('messages')
      .add({
        id: new Date(),
        text: messages,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        user: {
          username: userInfo.username,
          id: userInfo.id,
          isAdmin: true,
          photo: userInfo.photo,
          email: userInfo.email,
        },
      })
      .then(() => {
        setMessages('')
      })
  }

  return (
    <div>
      <div className=" chat-body" style={{ minHeight: '780px' }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div
                  className="card-body chat-wrapper p-0"
                  style={{ position: 'relative' }}
                >
                  <div
                    onClick={() => setOpenSlider((prev) => !prev)}
                    className="d-sm-block d-lg-none p-2 rounded-circle bg-secondary"
                    style={{
                      position: 'absolute',
                      cursor: 'pointer',
                      top: '70px',
                      zIndex: 1000,
                      right: '15px ',
                    }}
                  >
                    <Icons.MenuOutlined className="text-light" />
                  </div>
                  <Drawer
                    open={openSlider}
                    onClose={() => setOpenSlider(false)}
                    variant="persistent"
                  >
                    <List
                      className="text-light h-100"
                      style={{ backgroundColor: '#3B3363' }}
                    >
                      <Divider />
                      <ListItem component="div">
                        <div>
                          <div className="d-flex chat-fix-search align-items-center">
                            <img
                              src="images/profile/pic1.jpg"
                              alt=""
                              className="rounded-circle mr-3"
                            />
                            <div className="input-group message-search-area">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search here.."
                              />
                              <div className="input-group-append">
                                <button className="input-group-text">
                                  <i className="flaticon-381-search-2"></i>
                                </button>
                              </div>
                            </div>
                            <div
                              className="nav-control"
                              style={{
                                right: 0,
                                top: 20,
                                position: 'absolute',
                              }}
                              onClick={() => setOpenSlider(false)}
                            >
                              <div className="hamburger">
                                <span className="line"></span>
                                <span className="line"></span>
                                <span className="line"></span>
                              </div>
                            </div>
                          </div>
                          <div className="card-action card-tabs">
                            <ul className="nav nav-tabs style-3" role="tablist">
                              <li className="nav-item">
                                <a
                                  className="nav-link active"
                                  data-toggle="tab"
                                  href="#AllMessage"
                                  role="tab"
                                  aria-selected="false"
                                >
                                  All Message
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="card-body message-bx px-0 pt-3">
                            <div
                              className="tab-content dz-scroll ps ps--active-y"
                              id="message-bx"
                            >
                              <div
                                className="tab-pane fade show active"
                                id="AllMessage"
                                role="tabpanel"
                              >
                                {chats &&
                                  chats.map((each) => (
                                    <div
                                      key={each.id}
                                      className="chat-list-area"
                                      data-chat="person1"
                                      onClick={() => {
                                        setOpenSlider((prev) => !prev)
                                        setUserInfo({
                                          ...userInfo,
                                          photo: each.photo,
                                          username: each.username,
                                          email: each.email,
                                          id: each.id,
                                          isAdmin: each.isAdmin,
                                        })
                                      }}
                                    >
                                      <div className="image-bx">
                                        <img
                                          src={each.photo}
                                          alt="suport"
                                          className="rounded-circle img-1"
                                        />
                                        <span className="active"></span>
                                      </div>
                                      <div className="info-body">
                                        <div className="d-flex">
                                          <h6
                                            className="text-black user-name mb-0 font-w600 fs-16"
                                            data-name="Harry Marten"
                                          >
                                            {each.email.slice(0, 8)}...
                                          </h6>
                                          <span className="ml-auto fs-14">
                                            {moment(
                                              each.createdAt.toDate(),
                                            ).calendar()}
                                          </span>
                                        </div>
                                        <p className="">{each.username}</p>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </ListItem>
                    </List>
                  </Drawer>

                  <div className="chat-left-sidebar">
                    <div className="d-flex chat-fix-search align-items-center">
                      <div className="input-group message-search-area">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search here.."
                        />
                        <div className="input-group-append">
                          <button className="input-group-text">
                            <i className="flaticon-381-search-2"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="card-action card-tabs">
                      <ul className="nav nav-tabs style-3" role="tablist">
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            data-toggle="tab"
                            href="#AllMessage"
                            role="tab"
                            aria-selected="false"
                          >
                            All Message
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="card-body message-bx px-0 pt-3">
                      <div
                        className="tab-content dz-scroll ps ps--active-y"
                        id="message-bx"
                      >
                        <div
                          className="tab-pane fade show active"
                          id="AllMessage"
                          role="tabpanel"
                        >
                          {chats &&
                            chats.map((each) => (
                              <div
                                className="chat-list-area"
                                data-chat="person1"
                                key={each.id}
                                onClick={() => {
                                  setUserInfo({
                                    ...userInfo,
                                    photo: each.photo,
                                    username: each.username,
                                    email: each.email,
                                    id: each.id,
                                    isAdmin: each.isAdmin,
                                  })
                                }}
                              >
                                <div className="image-bx">
                                  <img
                                    src={each.photo || img}
                                    alt=""
                                    className="rounded-circle img-1"
                                  />
                                  <span className="active"></span>
                                </div>
                                <div className="info-body">
                                  <div className="d-flex">
                                    <h6
                                      className="text-black user-name mb-0 font-w600 fs-16"
                                      data-name="Harry Marten"
                                    >
                                      {each.email.slice(0, 8)}...
                                    </h6>
                                    <span className="ml-auto fs-14">
                                      {moment(
                                        each.createdAt.toDate(),
                                      ).calendar()}
                                    </span>
                                  </div>
                                  <p className="">{each.username}</p>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="chart-right-sidebar">
                    <div className="message-bx chat-box">
                      <div
                        className="d-flex justify-content-between chat-box-header"
                        key={userInfo.id}
                      >
                        <div className="d-flex align-items-center">
                          <img
                            src={userInfo.isAdmin ? img : userInfo.photo}
                            alt=""
                            className="rounded-circle main-img mr-3"
                          />
                          <h5 className="text-black font-w500 mb-sm-1 mb-0 title-nm">
                            {userInfo.username}
                          </h5>
                        </div>
                        <div className="d-flex align-items-center">
                          <span className="d-sm-inline-block d-none">
                            Always Online
                          </span>
                          <div className="dropdown ml-2">
                            <a
                              href="#"
                              data-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                                  stroke="#575757"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                                  stroke="#575757"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                                  stroke="#575757"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                              <Link className="dropdown-item" to="#">
                                Edit
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Scrollbars
                        style={{
                          height: 300,
                          backgroundImage:
                            "url('https://d22roh5inpczgk.cloudfront.net/xhtml/images/chat-bg.png')",
                        }}
                      >
                        <div
                          className="chat-box-area "
                          id="chartBox"
                          style={{
                            backgroundImage:
                              "url('https://d22roh5inpczgk.cloudfront.net/xhtml/images/chat-bg.png')",
                          }}
                        >
                          <div
                            data-chat="person1"
                            className="chat active-chat "
                          >
                            {messagesInDatabase &&
                              messagesInDatabase.map((each) => (
                                <div
                                  key={each.id}
                                  className={`media mb-4  ${
                                    each.user.isAdmin
                                      ? 'justify-content-end align-items-end'
                                      : 'received-msg  justify-content-start align-items-start'
                                  }`}
                                >
                                  <div
                                    className={
                                      each.user.isAdmin
                                        ? 'message-sent'
                                        : 'message-received'
                                    }
                                  >
                                    <p className="mb-1 d-inline-flex align-items-center">
                                      <img
                                        src={each.user.photo}
                                        alt=""
                                        className="rounded-circle img-1 mr-4 "
                                        width="38rem"
                                      />
                                      <span>{each.text}</span>
                                    </p>
                                    <span className="fs-12 text-black"></span>
                                  </div>
                                </div>
                              ))}
                          </div>

                          <div
                            className="ps__rail-x"
                            style={{ left: '0px', bottom: '0px' }}
                          >
                            <div
                              className="ps__thumb-x"
                              tabindex="0"
                              style={{ left: '0px', width: '0px' }}
                            ></div>
                          </div>
                          <div
                            className="ps__rail-y"
                            style={{
                              top: '0px',
                              height: '340px',
                              right: '0px',
                            }}
                          >
                            <div
                              className="ps__thumb-y"
                              tabindex="0"
                              style={{ top: '0px', height: '337px' }}
                            ></div>
                          </div>
                        </div>
                      </Scrollbars>
                      <div className="card-footer border-0 type-massage">
                        <div className="input-group">
                          <input
                            className="form-control "
                            placeholder="Type message..."
                            type="text"
                            value={messages.text}
                            onChange={(e) => setMessages(e.target.value)}
                          />
                          <div className="input-group-append">
                            <button
                              type="button"
                              className="send-btn btn-primary btn"
                              onClick={() => handleSubmit()}
                            >
                              SEND
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="copyright">
            <p>
              Copyright &copy; {new Date().getFullYear()}{' '}
              <a
                href="https://ultimatecoins.info"
                target="_blank"
                rel="noopener noreferrer"
              >
                UltimateCoins
              </a>{' '}
              All Rights Reserve
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminChat
