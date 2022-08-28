DROP TABLE IF EXISTS subtasks;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS boards;


CREATE TABLE boards(
    board_id text NOT NULL,
    name text NOT NULL,
    isComplete boolean NOT NULL,
    PRIMARY KEY(board_id)
);

CREATE TABLE tasks(
    task_id text NOT NULL,
    name text NOT NULL,
    board_id text,
    description text,
    subtasks text[],
    status text NOT NULL,
    PRIMARY KEY(task_id),
        CONSTRAINT fk_boards
            FOREIGN KEY(board_id)
                REFERENCES boards(board_id)
);

CREATE TABLE subtasks(
    subtask_id serial NOT NULL,
    name text NOT NULL,
    isComplete boolean NOT NULL,
    task_id text,
    PRIMARY KEY(subtask_id),
        CONSTRAINT fk_tasks
            FOREIGN KEY(task_id)
                REFERENCES tasks(task_id)
);
