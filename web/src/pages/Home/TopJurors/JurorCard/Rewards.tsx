import React from "react";
import styled, { css } from "styled-components";
import { landscapeStyle } from "styles/landscapeStyle";
import { getFormattedRewards } from "utils/jurorRewardConfig";
import EthIcon from "assets/svgs/icons/eth.svg";
import PnkIcon from "assets/svgs/icons/kleros.svg";
import { useUserQuery } from "hooks/queries/useUser";

const Container = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  ${landscapeStyle(
    () =>
      css`
        width: calc(60px + (240 - 60) * (min(max(100vw, 375px), 1250px) - 375px) / 875);
      `
  )}
`;

const StyledIcon = styled.div`
  width: 16px;
  height: 16px;

  path {
    fill: ${({ theme }) => theme.secondaryPurple};
  }
`;

const StyledLabel = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.primaryText};
`;

interface IRewards {
  address: string;
}

const Rewards: React.FC<IRewards> = ({ address }) => {
  const { data: userData } = useUserQuery(address?.toLowerCase());
  const formattedRewards = getFormattedRewards(userData, {});
  const ethReward = formattedRewards.find((r) => r.token === "ETH")?.amount;
  const pnkReward = formattedRewards.find((r) => r.token === "PNK")?.amount;

  return (
    <Container>
      <StyledLabel>{ethReward}</StyledLabel>
      <StyledIcon as={EthIcon} />
      <StyledLabel>+</StyledLabel>
      <StyledLabel>{pnkReward}</StyledLabel>
      <StyledIcon as={PnkIcon} />
    </Container>
  );
};
export default Rewards;
