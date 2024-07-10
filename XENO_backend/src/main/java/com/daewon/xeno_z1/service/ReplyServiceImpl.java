package com.daewon.xeno_z1.service;

import com.daewon.xeno_z1.domain.Reply;
import com.daewon.xeno_z1.domain.Review;
import com.daewon.xeno_z1.domain.Users;
import com.daewon.xeno_z1.dto.reply.ReplyDTO;
import com.daewon.xeno_z1.dto.reply.ReplyReadDTO;
import com.daewon.xeno_z1.dto.reply.ReplyUpdateDTO;
import com.daewon.xeno_z1.repository.ReplyRepository;
import com.daewon.xeno_z1.repository.ReviewRepository;
import com.daewon.xeno_z1.repository.UserRepository;
import com.daewon.xeno_z1.security.exception.ReviewNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional
public class ReplyServiceImpl implements ReplyService {

    private final ReplyRepository replyRepository;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;

    // @Override
    // public Long createReply(ReplyDTO replyDTO) {
    //     Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    //     String currentUserName = authentication.getName();

    //     Users user = userRepository.findByEmail(currentUserName)
    //             .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없음"));

    //     Review review = reviewRepository.findById(replyDTO.getReviewId())
    //             .orElseThrow(() -> new ReviewNotFoundException());

    //     Reply reply = Reply.builder()
    //             .users(user)
    //             .review(review)
    //             .text(replyDTO.getReplyText())
    //             .build();

    //     Reply savedReply = replyRepository.save(reply);
    //     review.setReplyIndex(review.getReplyIndex() + 1);
    //     reviewRepository.save(review);

    //     return savedReply.getReplyId();
    // }

    @Override
    public Long createReply(ReplyDTO replyDTO) {
        Users user = userRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("기본 사용자를 찾을 수 없음"));

        Review review = reviewRepository.findById(replyDTO.getReviewId())
                .orElseThrow(() -> new ReviewNotFoundException());

        Reply reply = Reply.builder()
                .users(user)
                .review(review)
                .text(replyDTO.getReplyText())
                .build();

        Reply savedReply = replyRepository.save(reply);
        reviewRepository.save(review);

        return savedReply.getReplyId();
    }

    @Override
    public ReplyReadDTO readReply(Long replyId) {
        Reply reply = replyRepository.findById(replyId)
                .orElseThrow(() -> new RuntimeException("댓글을 찾을 수 없음"));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = authentication.getName();
        Users currentUser = userRepository.findByEmail(currentUserName).orElse(null);

        return convertToReplyReadDTO(reply, currentUser);
    }

    @Override
    public List<ReplyReadDTO> readReplys(Long reviewId) {
        List<Reply> replies = replyRepository.listOfReview(reviewId);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = authentication.getName();
        Users currentUser = userRepository.findByEmail(currentUserName).orElse(null);

        return replies.stream()
                .map(reply -> convertToReplyReadDTO(reply, currentUser))
                .collect(Collectors.toList());
    }

    @Override
    public void updateReply(ReplyUpdateDTO replyUpdateDTO) {
        Reply reply = replyRepository.findById(replyUpdateDTO.getReplyId())
                .orElseThrow(() -> new RuntimeException("댓글을 찾을 수 없음"));

        // userId를 1로 가정
        Long assumedUserId = 1L;

        if (reply.getUsers().getUserId() != assumedUserId) {
            throw new RuntimeException("댓글을 수정할 권한이 없습니다.");
        }

        reply.setText(replyUpdateDTO.getReplyText());
        replyRepository.save(reply);
    }

    @Override
    public void deleteReply(Long replyId) {
        Reply reply = replyRepository.findById(replyId)
                .orElseThrow(() -> new RuntimeException("댓글을 찾을 수 없음"));
        
        // userId를 1로 가정
        Long assumedUserId = 1L;

        if (reply.getUsers().getUserId() != assumedUserId) {
            throw new RuntimeException("댓글을 수정할 권한이 없습니다.");
        }

        Review review = reply.getReview();

        replyRepository.deleteById(replyId);
    }

    @Override
    public List<ReplyReadDTO> getRepliesByUserId(Long userId) {
        List<Reply> replies = replyRepository.findByUserId(userId);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = authentication.getName();
        Users currentUser = userRepository.findByEmail(currentUserName).orElse(null);

        return replies.stream()
                .map(reply -> convertToReplyReadDTO(reply, currentUser))
                .collect(Collectors.toList());
    }

    private ReplyReadDTO convertToReplyReadDTO(Reply reply, Users currentUser) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일");
        return ReplyReadDTO.builder()
                .replyId(reply.getReplyId())
                .userName(reply.getUsers().getName())
                .replyText(reply.getText())
                .createAt(reply.getCreateAt() != null ? reply.getCreateAt().format(formatter) : null)
                .updateAt(reply.getUpdateAt() != null ? reply.getUpdateAt().format(formatter) : null)
                .isReply(currentUser != null && reply.getUsers().getUserId() == currentUser.getUserId())
                .build();
    }
}