import React, { Fragment, useState } from "react";
import Link from "next/link";
import PropTypes from "prop-types";

import classes from "./SummaryCard.module.css";

import { checkAnswer } from "../../utils/grade";
import Modal from "../UI/Modal/Modal";
import { BsXLg } from "react-icons/bs";

const SummaryCard = (props) => {
  // Declaring Variables for className
  const quesHeader = [classes.Question, classes.Head];
  const correctAnsHeader = [classes.CorrectAns, classes.Head];
  const yourAnsHeader = [classes.YourAns, classes.Head];

  return (
    <Fragment>
      <Modal show={props.show} clicked={props.clicked}>
        <section className={classes.Container}>
          <div className={classes.Close} onClick={props.clicked}>
            <BsXLg />
          </div>
          <header className={classes.Header}>
            <h1>Test 1</h1>
          </header>
          <div className={classes.Box}>
            <article className={classes.Slot}>
              <div className={quesHeader.join(" ")}>Question</div>
              <div className={correctAnsHeader.join(" ")}>Correct Answer</div>
              <div className={yourAnsHeader.join(" ")}>Your Answer</div>
            </article>
            {props.data.map((dt) => {
              let flag = true;
              if (dt.type == "multiple") {
                flag = checkAnswer(dt);
              } else if (dt.answer != dt.correctAnswer) flag = false;
              return (
                <article
                key={dt.ques}
                  style={{
                    backgroundColor: flag ? "#94f4b7" : "#ff8a8a",
                  }}
                  className={classes.Slot}
                >
                  <div className={classes.Question}>{dt.question}</div>
                  <div className={classes.CorrectAns}>
                    {dt.type == "multiple"
                      ? dt.correctAnswer.join(" ")
                      : dt.correctAnswer}
                  </div>
                  <div className={classes.YourAns}>
                    {dt.type == "multiple" ? dt.answer.join(" ") : dt.answer}
                  </div>
                </article>
              );
            })}
          </div>
          <div className={classes.RedirectBtn}>
            <Link href="/">Go to Homepage</Link>
          </div>
        </section>
      </Modal>
    </Fragment>
  );
};

SummaryCard.propTypes = {
  show: PropTypes.bool,
  clicked: PropTypes.func,
  data: PropTypes.array,
};

export default SummaryCard;
