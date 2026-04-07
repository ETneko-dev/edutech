INSERT INTO topic (id, name) VALUES
  (1, 'Math'),
  (2, 'Science'),
  (3, 'History'),
  (4, 'Music'),
  (5, 'Sports');

INSERT INTO question (id, topic_id, question, A, B, C, D, answer) VALUES
  (101, 1, 'What is 2 + 2?', '1', '3', '4', '5', '4'),
  (102, 2, 'What planet is known as the Red Planet?', 'Venus', 'Mars', 'Jupiter', 'Mercury', 'Mars'),
  (103, 3, 'Who wrote the Declaration of Independence?', 'George Washington', 'Thomas Jefferson', 'John Adams', 'Benjamin Franklin', 'Thomas Jefferson'),
  (104, 4, 'Which clef is typically used for violin music?', 'Bass', 'Treble', 'Alto', 'Tenor', 'Treble'),
  (105, 5, 'How many players are on a baseball field for one team?', '7', '8', '9', '10', '9');

