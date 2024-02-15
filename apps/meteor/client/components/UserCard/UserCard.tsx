import { css } from '@rocket.chat/css-in-js';
import { Box, Button, IconButton } from '@rocket.chat/fuselage';
import { UserAvatar } from '@rocket.chat/ui-avatar';
import { useTranslation } from '@rocket.chat/ui-contexts';
import type { ReactNode, ComponentProps } from 'react';
import React, { forwardRef } from 'react';

import { useEmbeddedLayout } from '../../hooks/useEmbeddedLayout';
import MarkdownText from '../MarkdownText';
import * as Status from '../UserStatus';
import UserCardActions from './UserCardActions';
import UserCardContainer from './UserCardContainer';
import UserCardInfo from './UserCardInfo';
import UserCardRoles from './UserCardRoles';
import UserCardUsername from './UserCardUsername';

const clampStyle = css`
	display: -webkit-box;
	overflow: hidden;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	word-break: break-all;
`;

type UserCardProps = {
	onOpenUserInfo?: () => void;
	name?: string;
	username?: string;
	etag?: string;
	customStatus?: ReactNode;
	roles?: ReactNode;
	bio?: ReactNode;
	status?: ReactNode;
	actions?: ReactNode;
	localTime?: ReactNode;
	onClose?: () => void;
	nickname?: string;
} & ComponentProps<typeof UserCardContainer>;

const UserCard = forwardRef<HTMLElement, UserCardProps>(function UserCard(
	{
		onOpenUserInfo,
		name,
		username,
		etag,
		customStatus,
		roles,
		bio,
		status = <Status.Offline />,
		actions,
		localTime,
		onClose,
		nickname,
		...props
	},
	ref,
) {
	const t = useTranslation();
	const isLayoutEmbedded = useEmbeddedLayout();

	return (
		<UserCardContainer data-qa='UserCard' ref={ref} {...props}>
			<div>
				{username && <UserAvatar username={username} etag={etag} size='x124' />}
				<Box flexGrow={0} display='flex' mbs={12} alignItems='center' justifyContent='center'>
					<UserCardActions>{actions}</UserCardActions>
				</Box>
			</div>
			<Box display='flex' flexDirection='column' flexGrow={1} flexShrink={1} mis={16} width='1px'>
				<Box mbe={4} withTruncatedText display='flex' alignItems='center'>
					<UserCardUsername status={status} name={name} />
					{nickname && (
						<Box flexGrow={1} flexShrink={1} flexBasis={0} title={nickname} color='hint' mis={4} fontScale='p2' withTruncatedText>
							({nickname})
						</Box>
					)}
				</Box>
				{customStatus && (
					<UserCardInfo mbe={16}>
						{typeof customStatus === 'string' ? (
							<MarkdownText withTruncatedText variant='inlineWithoutBreaks' content={customStatus} parseEmoji={true} />
						) : (
							customStatus
						)}
					</UserCardInfo>
				)}
				<UserCardRoles>{roles}</UserCardRoles>
				<UserCardInfo>{localTime}</UserCardInfo>
				{bio && (
					<UserCardInfo withTruncatedText={false} className={clampStyle} height='x60'>
						{typeof bio === 'string' ? <MarkdownText variant='inline' content={bio} /> : bio}
					</UserCardInfo>
				)}
				{onOpenUserInfo && !isLayoutEmbedded && (
					<div>
						<Button small onClick={onOpenUserInfo}>
							{t('See_full_profile')}
						</Button>
					</div>
				)}
			</Box>
			{onClose && <IconButton mis={16} small aria-label={t('Close')} icon='cross' onClick={onClose} />}
		</UserCardContainer>
	);
});

export default UserCard;
