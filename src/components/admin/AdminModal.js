import React from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import moment from 'moment'

function AdminModal({
  userInfo,
  handlePaymentSubmit,
  handleSavingSubmit,
  setUserInfo,
}) {
  return (
    <Modal
      centered
      show={userInfo.openModal}
      onHide={() => setUserInfo({ ...userInfo, openModal: false })}
    >
      <Form
        onSubmit={
          userInfo.infoTitle === 'payments'
            ? handlePaymentSubmit
            : handleSavingSubmit
        }
      >
        <Modal.Header closeButton>
          <Modal.Title>{userInfo.infoTitle} data</Modal.Title>
        </Modal.Header>
        <Form.Control
          type="email"
          name="email"
          value={userInfo.userEmail}
          className="mt-4"
          disabled
          onChange={(e) =>
            setUserInfo({ ...userInfo, userEmail: e.target.value })
          }
        />
        <Form.Control
          type="text"
          name="uid"
          className="mt-4"
          value={userInfo.uid}
          onChange={(e) => setUserInfo({ ...userInfo, uid: e.target.value })}
        />
        <Form.Control
          as="select"
          type="text"
          name="status"
          className="mt-4 text-white bg-dark"
          value={userInfo.status}
          onChange={(e) => setUserInfo({ ...userInfo, status: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
        </Form.Control>
        <Form.Control
          type="text"
          value={
            userInfo.date ? moment(userInfo.date?.toDate()).calendar() : ''
          }
          className="mt-4"
          onChange={(e) => setUserInfo({ ...userInfo, date: e.target.value })}
          disabled
        />
        <div className="text-center my-4">
          <Button type="submit">Upload</Button>
        </div>
      </Form>
    </Modal>
  )
}

export default AdminModal
