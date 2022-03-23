import React, { useState, useEffect, useRef } from 'react'

import { useFirebase } from 'react-redux-firebase'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import img from '../../assets/avater.png'
import UserNav1 from './UserNav1'
import moment from 'moment'
import * as Icons from '@material-ui/icons'
import { List, ListItem, Divider, Drawer } from '@material-ui/core'
import { Scrollbars } from 'react-custom-scrollbars-2'
import Ufooter from './Ufooter'

function ChatAuth() {
  const firebase = useFirebase()

  const scroll = useRef()

  const userProfile = useSelector((state) => state.firebase.profile)

  const typing = useSelector((state) => state.projectReducer.isTyping)

  const [messages, setMessages] = useState('')
  const [openSlider, setOpenSlider] = useState(false)
  const [pageLoading, setPageLoading] = useState(false)

  const [mainMessage, setMainMessage] = useState([])

  useEffect(() => {
    const subscribe = firebase
      .firestore()
      .collection('chats')
      .doc(userProfile.uid)
      .collection('messages')
      .orderBy('createdAt')
      .onSnapshot((snaps) => {
        setMainMessage(snaps.docs.map((each) => each.data()))
      })
    scroll.current.scrollIntoView({ behavior: 'smooth' })
    return subscribe
  }, [])

  useEffect(() => {
    const subscribe = firebase
      .firestore()
      .collectionGroup('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snaps) => {
        console.log(
          'filtered user chat',
          snaps.docs.map((each) => each.data()),
        )
      })
    return subscribe
  }, [])

  const handleSubmit = (text) => {
    if (messages === '') {
      return
    }
    firebase
      .firestore()
      .collection('chats')
      .doc(userProfile.uid)
      .collection('messages')
      .add({
        id: new Date(),
        text: messages,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        user: {
          username: userProfile.firstname,
          id: userProfile.uid,
          photo: userProfile.photo,
          email: userProfile.email,
          isAdmin: false,
        },
      })

      .then(() => {
        setMessages('')
        scroll.current.scrollIntoView({ behavior: 'smooth' })
        return firebase
          .firestore()
          .collection('chats')
          .doc(userProfile.uid)
          .set({
            username: userProfile.firstname,
            id: userProfile.uid,
            photo: userProfile.photo,
            email: userProfile.email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            isTypingUser: false,
            isTypingAdmin: false,
          })
      })
  }

  return (
    <div id="main-wrapper" className="show">
      <UserNav1 />

      {/*
            Sidebar end
        ************************************/}

      <div className="content-body chat-body" style={{ minHeight: '780px' }}>
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
                                <div
                                  className="chat-list-area"
                                  data-chat="person1"
                                  onClick={() => setOpenSlider((prev) => !prev)}
                                >
                                  <div className="image-bx">
                                    <img
                                      src={img}
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
                                        Admin
                                      </h6>
                                      <span className="ml-auto fs-14">
                                        {moment(new Date()).calendar()}
                                      </span>
                                    </div>
                                    <p className="">Chat with Us now</p>
                                    <p className="">
                                      {typing.user && 'typing...'}
                                    </p>
                                  </div>
                                </div>
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
                      <div className="tab-content " id="message-bx">
                        <div
                          className="tab-pane fade show active"
                          id="AllMessage"
                          role="tabpanel"
                        >
                          <div className="chat-list-area" data-chat="person1">
                            <div className="image-bx">
                              <img
                                src={img}
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
                                  Admin
                                </h6>
                                <span className="ml-auto fs-14">
                                  {moment(new Date()).calendar()}
                                </span>
                              </div>
                              <p className="">Chat with Us now</p>
                              <p className="">{typing.admin && 'typing...'}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="chart-right-sidebar">
                    <div className="message-bx chat-box">
                      <div className="d-flex justify-content-between chat-box-header">
                        <div className="d-flex align-items-center">
                          <div className="image-bx">
                            <img
                              src={img}
                              alt=""
                              className="rounded-circle main-img mr-3"
                            />
                            <span className="active"></span>
                          </div>

                          <h5 className="text-black font-w500 mb-sm-1 mb-0 title-nm">
                            Admin
                          </h5>
                        </div>
                        <div className="d-flex align-items-center">
                          <span className="d-sm-inline-block d-none">
                            Always Online
                          </span>
                          <p className="">{typing.admin && 'typing...'}</p>
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
                        <div className="chat-box-area " id="chartBox">
                          <div
                            data-chat="person1"
                            className="chat active-chat "
                          >
                            {mainMessage.map((each) => (
                              <div
                                key={each.id}
                                className={`media mb-4  ${
                                  each.user.id === userProfile.uid
                                    ? 'justify-content-end align-items-end'
                                    : 'received-msg  justify-content-start align-items-start'
                                }`}
                              >
                                <div
                                  className={
                                    each.user.id === userProfile.uid
                                      ? 'message-sent'
                                      : 'message-received'
                                  }
                                >
                                  <p
                                    className="mb-1 d-inline-flex align-items-center"
                                    style={{ wordBreak: 'break-all' }}
                                  >
                                    <img
                                      src={
                                        each.user.isAdmin
                                          ? img
                                          : each.user.photo
                                      }
                                      alt=""
                                      className="rounded-circle img-1 mr-4 "
                                      width="38rem"
                                    />
                                    <span>{each.text}</span>
                                  </p>
                                  <span className="fs-12 text-black">
                                    {moment(
                                      each.createdAt?.toDate(),
                                    ).calendar()}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div ref={scroll}></div>
                      </Scrollbars>
                      <div className="card-footer border-0 type-massage">
                        <div className="input-group">
                          <input
                            className="form-control "
                            placeholder="Type message..."
                            type="text"
                            value={messages}
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
        <Ufooter />
      </div>
    </div>
  )
}

export default ChatAuth
