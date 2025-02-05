import React from "react";
import styled from "styled-components";

const FieldWrapper = styled.div`
  display: inline-flex;
  gap: 8px;
`;

const SeparatorLabel = styled.label`
  margin-left: 8px;
  margin-right: 8px;
`;

const Field: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <FieldWrapper>
    <label>{label}</label>
    <small>{value}</small>
  </FieldWrapper>
);

const Separator: React.FC = () => <SeparatorLabel>|</SeparatorLabel>;

export interface IStats {
  totalDisputes: number;
  closedDisputes: number;
}

const Stats: React.FC<IStats> = ({ totalDisputes, closedDisputes }) => {
  const inProgressDisputes = (totalDisputes - closedDisputes).toString();

  const fields = [
    { label: "Total", value: totalDisputes.toString() },
    { label: "In Progress", value: inProgressDisputes },
    { label: "Closed", value: closedDisputes.toString() },
  ];

  return (
    <div>
      {fields.map(({ label, value }, i) => (
        <React.Fragment key={i}>
          <Field {...{ label, value }} />
          {i + 1 < fields.length ? <Separator /> : null}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stats;
